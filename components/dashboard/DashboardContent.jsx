import { auth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import axios from "axios";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { Delete, DeleteIcon, Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const DashboardContent = () => {
  const { userId } = auth();
  const [loading, setloading] = useState(false);
  const [templates, settemplates] = useState([]);
  const [selectedtemplate,setselectedtemplate] = useState(null)



  useEffect(() => {
    const fetchtemplates = async () => {
      setloading(true);
      try {
        const response = await axios.get(`/api/template`);
        // console.log(response)
        const usertemp = response.data.filter(
          (template) => template.user === userId || template.user?.id === userId
        );
        settemplates(usertemp);
        setloading(false);
      } catch (error) {
        // console.log(error);
        setloading(false);
      }
    };
    fetchtemplates();
  }, [userId]);


  const deletetemplate = async () => {
    if (!selectedtemplate) return;
    try {
      await axios.delete(`/api/template?id=${selectedtemplate}`)
      const res = await axios.get(`/api/template`)
      const usertemp = res.data.filter(
        (template) => template.user === userId || template.user?.id === userId
      );
      settemplates(usertemp); 
      
    } catch (error) {
      // console.log(error)
      
    }
  }

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card
          className="min-h-[250px] cursor-pointer border-dashed bg-muted/30 transition-colors hover:border-primary hover:bg-card"
          onClick={() => {
            window.location.href = "/dashboard/projects/new";
          }}
        >
          <CardContent className="flex h-full min-h-[250px] flex-col items-center justify-center text-center">
            <h1 className="font-semibold">New template</h1>
            <p className="mt-2 text-sm text-muted-foreground">Upload a code snippet</p>
          </CardContent>
        </Card>
        {[
          ...[...templates].reverse().map((template) => (
            <Card key={template._id || template.id} className="overflow-hidden bg-card transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="truncate text-sm">
                  {template.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                 width={32} // Add width
                 height={32} // Add height
                   src={template.images?.[0] || "/placeholder.png"}
                  alt="template"
                  quality={100}
                  unoptimized
                  className="h-40 w-full rounded-md object-cover object-center border"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => {
                    window.location.href =
                      "/dashboard/projects/edit/" + template._id;
                  }}
                >
                  <Pencil size={18} />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                  <Button
                  
                  variant="ghost"
                  onClick={() => {
                    setselectedtemplate(template._id)
                  }}
                >
                  <Trash size={18} />
                </Button>
                  
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure to delete this template?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your template from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button
                  variant="ghost"
                  onClick={deletetemplate}
                >
                  {/* <DeleteIcon size={18} /> */}
                  Delete
                </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          )),
        ]}
      </div>
    </>
  );
};

export default DashboardContent;
