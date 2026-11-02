import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { Pencil, Plus, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";

const DashboardContent = () => {
  const { user, isLoaded } = useUser();
  const userId = user?.id;
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [templates, settemplates] = useState([]);
  const [selectedtemplate, setselectedtemplate] = useState(null);

  useEffect(() => {
    if (!isLoaded || !userId) return;

    const fetchtemplates = async () => {
      setloading(true);
      try {
        const response = await axios.get(`/api/template`);
        const usertemp = response.data.filter(
          (template) => template.user === userId || template.user?.id === userId
        );
        settemplates(usertemp);
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    };
    fetchtemplates();
  }, [isLoaded, userId]);

  const deletetemplate = async () => {
    if (!selectedtemplate) return;
    try {
      await axios.delete(`/api/template?id=${selectedtemplate}`);
      const res = await axios.get(`/api/template`);
      const usertemp = res.data.filter(
        (template) => template.user === userId || template.user?.id === userId
      );
      settemplates(usertemp);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            My Templates
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage, edit, or upload your code templates
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/projects/new")}
          className="gap-2"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Upload Template</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Create new card */}
        <Card
          className="group min-h-[260px] cursor-pointer border-dashed border-2 bg-muted/20 transition-all hover:border-primary hover:bg-card hover:shadow-md"
          onClick={() => {
            router.push("/dashboard/projects/new");
          }}
        >
          <CardContent className="flex h-full min-h-[260px] flex-col items-center justify-center p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110 mb-4">
              <Plus size={24} />
            </div>
            <h3 className="font-semibold text-foreground text-base">New Template</h3>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Upload and share a new code snippet
            </p>
          </CardContent>
        </Card>

        {/* Existing templates */}
        {[...templates].reverse().map((template) => (
          <Card
            key={template._id || template.id}
            className="flex flex-col overflow-hidden bg-card border border-border shadow-xs transition-shadow hover:shadow-md"
          >
            <CardHeader className="p-4 pb-2">
              <CardTitle className="truncate text-sm font-semibold text-foreground">
                {template.title}
              </CardTitle>
              {template.framework && (
                <span className="text-[11px] font-medium text-muted-foreground">
                  {template.framework}
                </span>
              )}
            </CardHeader>
            <CardContent className="p-4 pt-1 flex-1">
              <div className="relative h-40 w-full overflow-hidden rounded-lg bg-muted border border-border">
                <Image
                  src={template.images?.[0] || "/placeholder.png"}
                  alt={template.title || "template"}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border/60 p-3 bg-muted/10">
              <Link href={"/dashboard/projects/edit/" + template._id}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Pencil size={15} /> Edit
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      setselectedtemplate(template._id);
                    }}
                  >
                    <Trash size={15} /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this template?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      template from the servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      variant="destructive"
                      onClick={deletetemplate}
                    >
                      Delete Template
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
