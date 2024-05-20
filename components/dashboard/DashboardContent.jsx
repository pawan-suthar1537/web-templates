import { useSession } from "next-auth/react";
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

const DashboardContent = () => {
  const { data: session } = useSession();
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
          (template) => template.user.id === session.user.id
        );
        settemplates(usertemp);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchtemplates();
  }, [session]);


  const deletetemplate = async () => {
    try {
      await axios.delete(`/api/template?id=${selectedtemplate}`)
      const res = await axios.get(`/api/template`)
      const usertemp = res.data.filter(
        (template) => template.user.id === session.user.id
      );
      settemplates(usertemp); 
      
    } catch (error) {
      console.log(error)
      
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
      <div className="grid grid-cols-3 gap-4">
        <Card
          className="w-[200px] h-auto bg-gray-100 cursor-pointer mb-3 hover:bg-white"
          onClick={() => {
            window.location.href = "/dashboard/projects/new";
          }}
        >
          <CardContent className="flex flex-col items-center justify-center mt-2 text-center h-full">
            <h1>New Template</h1>
          </CardContent>
        </Card>
        {[
          ...templates.reverse().map((template) => (
            <Card key={template.id} className="w-[250px]  bg-white mb-3 ">
              <CardHeader>
                <CardTitle className="truncate text-sm">
                  {template.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={template.images[0]}
                  alt="template"
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
