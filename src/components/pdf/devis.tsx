import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { useEffect, useRef } from "react";
import useRoutePrefix from "@/hooks/useRoutePrefix"
import { getDetailsConsultation } from "@/store/consultations/actions";
import type { RootState } from "@/store/store";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FaChevronCircleLeft } from "react-icons/fa";
import writtenNumber from "written-number";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas-pro';

const Devis = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const baseRoute = useRoutePrefix();
    const printRef = useRef(null);
    const dispatch = useAppDispatch();
    const ConsultationDetails = useAppSelector((state: RootState) => state.consultation.ConsultationDetails)
    const devisSoins = useAppSelector((state: RootState) => state.consultation.ConsultationDetails?.devis);
    function getCurrentDateTimeLocal() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        return `${day}/${month}/${year}`;
    }

    let dateHeureFormat: string;

    if (ConsultationDetails?.dateHeure) {
       dateHeureFormat = format(new Date(ConsultationDetails.dateHeure), "dd/MM/yyyy", { locale: fr });
    }

    useEffect(() => {
        if (id) {
            dispatch(getDetailsConsultation(Number(id)));
        }
    }, [dispatch, id]);
    

    const CalculMontantFacture = () => {
        let MontantTotal:number = 0;

        if (devisSoins) {
            for (let i = 0; i < devisSoins.length; i++) {
                MontantTotal = MontantTotal + devisSoins[i].soin.tarif
            }
        }

        return(MontantTotal);
    }

    const HandleImpressPdf = async () =>{
        const element = printRef.current;
        if (!element) {
            return;
        }

        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4"
        });

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight= (imgProperties.height * pdfWidth / imgProperties.width)
         
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("examplepdf.pdf");
;    }

    // const { toPDF, targetRef } = usePDF({ filename: "facture.pdf" });

  return (
    <section className="flex flex-col justify-center items-center relative gap-4 w-full h-full p-2">
        <button
            type="button"
            onClick={() => navigate(`${baseRoute}/detailsconsultation/${id}`)}
            className="absolute top-4 left-4 text-[#0DABCB] text-2xl cursor-pointer"
        >
            <FaChevronCircleLeft />
        </button>
        <section ref={printRef} className="flex flex-col gap-16 border border-gray-200 p-4 h-[1170px] w-[827px]">
            <div className="flex items-center h-[10%] justify-around border-b-2 pb-4 border-[#9616cc]">
                <div>
                    <img className="w-50" src='/logorad.png'/>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <p className="text-[#9616cc] font-bold text-2xl">CLINIQUE DENTAIRE RADIANCE</p>
                    <p className="font-bold text-sm">Dr. Diane KENNE WANDO P. Epse TIOTSOP</p>
                    <p className="text-sm">CHIRURGIENNE-DENTISTE / ONCDC 433</p>
                </div>
            </div>
            <div className="flex flex-col justify-around p-4 h-[70%]">
                <div className="flex justify-between">
                    <p></p>
                    <p>Douala, le {getCurrentDateTimeLocal()}</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <p className="text-xl font-bold underline">DEVIS</p>
                    <span className="flex items-center">
                        <i>Concerné</i>
                        <p className="font-bold text-lg uppercase">/ {ConsultationDetails?.patient.nom} {ConsultationDetails?.patient.prenom}</p>
                    </span>
                </div>
                <table className="border border-black">
                    <thead>
                        <tr>
                            <th className="border border-black">DATE</th>
                            <th className="border border-black">Nº DENT</th>
                            <th className="border border-black">NATURE DES ACTES</th>
                            <th className="border border-black">CODIFICATION</th>
                            <th className="border border-black">MONTANT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devisSoins?.map((soin, index) => (
                        <tr key={index}>
                            {index === 0 && (
                            <td className="border border-black pl-2" rowSpan={devisSoins.length} >
                                {dateHeureFormat}
                            </td>
                            )}
                            <td className="border border-black pl-2">{soin.dent.numero}</td>
                            <td className="border border-black pl-2">{soin.soin.nom}</td>
                            <td className="border border-black pl-2">{soin.soin.codification}</td>
                            <td className="border border-black pl-2">{soin.soin.tarif}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <p className="font-medium text-center">
                    {CalculMontantFacture()} fcfa
                    ({writtenNumber(CalculMontantFacture(), { lang: "fr" })} FCFA)
                </p>
            </div>
            <div className="flex items-center pb-6 pl-16 bg-linear-to-b from-[#0caccc] to-white h-[10%] rounded-tl-full">
                <div className="w-1/2 pr-8 border-r-4 border-[#9616cc]">
                    <div className="flex gap-2 pb-1">
                        <FaLocationDot />
                        <p className="text-xs font-medium">2e Immeuble après ancien canne à sucre Deido, venant de la pharmacie de la rive</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <MdEmail />
                        <p className="text-xs font-medium">cliniquedentaireradiance25@gmail.com</p>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-1 pl-8">
                    <div className="flex items-center">
                        <FaWhatsapp />
                        <p className="text-xs font-medium px-2">696533046</p>
                        <FaPhone />
                        <p className="text-xs font-medium pl-2">692376753 / 683476787</p>
                    </div>
                    <p className="text-xs font-medium"><span className='text-[#9616cc]'>NUI : </span> M062517816119K</p>
                    <p className="text-xs font-medium"><span className='text-[#9616cc]'>RCCM : </span> CM-DLA-03-2025-B13-00430</p>
                </div>
            </div>
        </section>
        <section className="">
            <button onClick={HandleImpressPdf} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 text-sm py-1 px-2 rounded-md text-white font-medium text-right cursor-pointer">
                Télécharger en PDF
            </button>
        </section>
    </section>
  );
};

export default Devis;

