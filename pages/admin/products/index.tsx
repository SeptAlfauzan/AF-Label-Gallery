import React from "react";
import FileDrop from "../../../components/common/FileDrop";
import AdminLayout from "../../../components/layouts/adminLayout";

const Products: React.FC = () => {
  return (
    <AdminLayout>
      <FileDrop />
    </AdminLayout>
  );
};

export default Products;
