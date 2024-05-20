import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TemplateForm from "@/components/dashboard/TemplateForm";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditTemplate = () => {
  const [templateinfo, settemplateinfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/template?id=" + id).then(
      (res) => {
        settemplateinfo(res.data);
      },
      [id]
    );
  });

  return (
    <>
      <DashboardLayout>
        {templateinfo && <TemplateForm {...templateinfo} />}
      </DashboardLayout>
    </>
  );
};

export default EditTemplate;
