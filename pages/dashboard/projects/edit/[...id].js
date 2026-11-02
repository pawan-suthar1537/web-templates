import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TemplateForm from "@/components/dashboard/TemplateForm";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditTemplate = () => {
  const [templateinfo, settemplateinfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axios
      .get("/api/template?id=" + id)
      .then((res) => {
        settemplateinfo(res.data);
      })
      .catch((err) => {
        console.error("Error fetching template for edit:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <DashboardLayout>
      {loading && (
        <div className="flex min-h-[50vh] items-center justify-center">
          <Spinner />
        </div>
      )}
      {!loading && templateinfo && <TemplateForm {...templateinfo} />}
      {!loading && !templateinfo && id && (
        <div className="p-8 text-center text-muted-foreground">
          Template could not be loaded.
        </div>
      )}
    </DashboardLayout>
  );
};

export default EditTemplate;
