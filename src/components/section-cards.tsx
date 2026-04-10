import {
  Card,
  CardTitle,
} from "@/components/ui/card"
import useAppDispatch from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { getAllPatients } from "@/store/patients/actions";
import { getAllConsultations } from "@/store/consultations/actions";
import { getAllUsers } from "@/store/users/actions";
import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import { FaUserDoctor } from "react-icons/fa6";
import { RiHealthBookFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

export function SectionCards() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getAllPatients());
    dispatch(getAllConsultations());
    dispatch(getAllUsers());
  }, [dispatch]);

  const users = useAppSelector((state: RootState) => state.user.items);
  const patients = useAppSelector((state: RootState) => state.patient.items);
  const consultations = useAppSelector((state: RootState) => state.consultation.items);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card>
        <div className="flex items-center gap-4 px-4">
          <div className="flex justify-center items-center rounded-full w-15 h-15 bg-[#9616cc]">
            <FaUsers className="text-white text-2xl"/>
          </div>
          <div>
            <CardTitle className="text-md font-semibold tabular-nums @[250px]/card:text-2xl">
              Nombre total de patients
            </CardTitle>
            <b className="text-[#9616cc] text-2xl">{patients.length}</b>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-4 px-4">
          <div className="flex justify-center items-center rounded-full w-15 h-15 bg-[#9616cc]">
            <RiHealthBookFill className="text-white text-2xl"/>
          </div>
          <div> 
            <CardTitle className="text-md font-semibold tabular-nums @[250px]/card:text-2xl">
              Total des consultations
            </CardTitle>
            <b className="text-[#9616cc] text-2xl">{consultations.length}</b>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-4 px-4">
            <div className="flex justify-center items-center rounded-full w-15 h-15 bg-[#9616cc]">
            <FaUserDoctor className="text-white text-2xl"/>
          </div>
          <div>
            <CardTitle className="text-md font-semibold tabular-nums @[250px]/card:text-2xl">
              Nombre total du personnel
            </CardTitle>
            <b className="text-[#9616cc] text-2xl">{users.length}</b>
          </div>
        </div>
      </Card>
    </div>
  )
}
