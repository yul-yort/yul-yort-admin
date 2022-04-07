import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, Button, Paper, Snackbar, Typography } from "@mui/material";
import css from "./styles.module.scss";
import { IDetail, IFormFields } from "./types";
import { ConfirmModal } from "../../../../components/common/ConfirmModal";
import { AgencyCreateEditModal } from "../../../../components/shared/AgencyCreateEditModal";
import { DetailAdditionalInfo } from "../DetailAdditionalInfo";
import { DetailRoutes } from "../DetailRoutes";
import { UIPhonesFormatter, VMPhonesRequestFormatter } from "./mappers";
import { useRouter } from "react-router5";

export const Detail: FC<IDetail> = ({
  agency: { id, agencyName, phones = [], createDate, description, editedDate },
  editAgency,
  deleteAgency,
  editLoading,
  unsetEditError,
  editError,
}) => {
  const { navigate } = useRouter();

  const [deleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [editModal, setOpenEditModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const methods = useForm<IFormFields>({
    defaultValues: {
      id,
      agencyName,
      description,
      phones: UIPhonesFormatter(phones),
    },
  });

  const {
    formState,
    formState: { isSubmitSuccessful, isDirty },
    reset,
    getValues,
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(getValues());
    }
  }, [formState, getValues, isSubmitSuccessful, reset]);

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleEdit = () => {
    setOpenEditModal(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    setOpenDeleteModal(false);
    await deleteAgency({ id });
    navigate("agencies");
  };

  const handleConfirmCloseEditModal = () => {
    setShowConfirm(false);
    setOpenEditModal(false);

    reset();
  };

  const handleCancelCloseEditModal = () => {
    setShowConfirm(false);
  };

  const handleSaveEdit = async (fields: IFormFields) => {
    await editAgency({
      ...fields,
      phones: VMPhonesRequestFormatter(fields.phones),
      editedDate: new Date(),
    });

    setOpenEditModal(false);
  };

  const handleCancelEdit = () => {
    if (editLoading) {
      return;
    }

    if (isDirty) {
      setShowConfirm(true);
    } else {
      handleConfirmCloseEditModal();
    }
  };

  return (
    <>
      <Paper className={css.wrapper}>
        <div className={css.pageHeader}>
          <Typography variant="h6" className={css.headerTitle}>
            {agencyName}
          </Typography>
          <Button variant="text" color="error" onClick={handleDelete}>
            Удалить
          </Button>
        </div>

        <div className={css.detail}>
          <DetailAdditionalInfo
            handleEdit={handleEdit}
            agencyName={agencyName}
            createDate={createDate}
            editedDate={editedDate}
            phoneValues={phones}
            description={description}
          />

          <DetailRoutes />
        </div>
      </Paper>

      <ConfirmModal
        open={deleteModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Подтвердите удаление агентства."
      />

      <FormProvider {...methods}>
        <AgencyCreateEditModal
          open={editModal}
          loading={editLoading}
          onClose={handleCancelEdit}
          onSave={handleSaveEdit}
          onConformClose={handleConfirmCloseEditModal}
          onCancelClose={handleCancelCloseEditModal}
          showConfirm={showConfirm}
          title="Редактировать агенство"
        />
      </FormProvider>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!editError}
        autoHideDuration={6000}
        onClose={unsetEditError}
      >
        <Alert variant="filled" severity="error" onClose={unsetEditError}>
          {editError?.name} {editError?.message}
        </Alert>
      </Snackbar>
    </>
  );
};
