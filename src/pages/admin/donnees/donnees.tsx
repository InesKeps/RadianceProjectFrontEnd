import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Soins from "./tablesoins/soins";
import Motifs from "./tablemotifs/motifs";
import Dents from "./tabledents/dents";


const Datas = () =>{
    return (
        <section className="flex flex-col items-center gap-4 p-4">
            <div className="flex items-center justify-center">
                <h1 className="font-medium text-xl text-[#0DABCB]">Gestion des données du cabinet Radiance</h1>
            </div>
            <Tabs
                defaultValue="soins"
                className="w-full flex-col  gap-6"
                >
                <div className="flex items-center justify-center px-4 lg:px-6 ">
                    <Label htmlFor="view-selector" className="sr-only">
                        View
                    </Label>
                    <Select defaultValue="soins">
                    <SelectTrigger
                        className="flex w-fit @4xl/main:hidden"
                        size="sm"
                        id="view-selector"
                    >
                        <SelectValue placeholder="Select a view" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="soins">Soins</SelectItem>
                        <SelectItem value="motifs">Motifs</SelectItem>
                        <SelectItem value="dents">Dents</SelectItem>
                    </SelectContent>
                    </Select>
                    <TabsList className="bg-[#f7f9fa] border **:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                    <TabsTrigger className="px-8" value="soins">Soins</TabsTrigger>
                    <TabsTrigger className="px-8" value="motifs">Motifs</TabsTrigger>
                    <TabsTrigger className="px-8" value="dents">Dents</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="soins" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                    <Soins/>
                </TabsContent>
                <TabsContent value="motifs"className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                    <Motifs/>
                </TabsContent>
                <TabsContent value="dents" className="flex flex-col px-4 lg:px-6">
                    <Dents/>
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default Datas;