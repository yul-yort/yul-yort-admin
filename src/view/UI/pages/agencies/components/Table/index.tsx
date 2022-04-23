import React, { useState, VFC } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { FormProvider, useForm } from "react-hook-form";

import TableHeader from "../TableHeader";
import TableToolbar from "../TableToolbar";
import TableBodyTemplate from "../TableBody";
import { ITable } from "./types";
import css from "./styles.module.scss";
import { ICreateOrEditAgencyFormFields } from "../../../../components/shared/AgencyCreateEditForm/types";
import { AgencyCreateEditModal } from "../../../../components/shared/AgencyCreateEditModal";

const AgencyTable: VFC<ITable> = ({ agencies, createAgency, loading }) => {
  const [createModal, setOpenCreateModal] = useState<boolean>(false);

  const methods = useForm<ICreateOrEditAgencyFormFields>({
    defaultValues: {
      phones: [{ value: "" }],
    },
  });

  const { reset } = methods;

  const handleOpenModal = () => {
    setOpenCreateModal(true);
  };

  const handleCancelEdit = () => {
    setOpenCreateModal(false);

    reset();
  };

  const handleSaveEdit = async (fields: ICreateOrEditAgencyFormFields) => {
    await createAgency(fields);
    setOpenCreateModal(false);
  };

  return (
    <>
      <Paper className={css.wrapper}>
        <TableToolbar onAddAgency={handleOpenModal} />

        <TableContainer>
          <Table aria-labelledby="tableTitle" size="small">
            <TableHeader />

            <TableBodyTemplate rows={agencies} />
          </Table>
        </TableContainer>
      </Paper>

      <FormProvider {...methods}>
        <AgencyCreateEditModal
          loading={loading}
          open={createModal}
          onClose={handleCancelEdit}
          onSave={handleSaveEdit}
          title="Создать агенство"
        />
      </FormProvider>
    </>
  );
};

export default AgencyTable;
