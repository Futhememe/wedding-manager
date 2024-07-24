import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  AlertDialogProps,
} from "@chakra-ui/react";

interface IDeleteModal extends Omit<AlertDialogProps, "children"> {
  variant?: "invite" | "guest";
  onConfirm: () => void;
  loading?: boolean;
}

export const DeleteModal = ({
  variant = "guest",
  loading = false,
  ...rest
}: IDeleteModal) => {
  return (
    <AlertDialog {...rest}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {variant === "guest" ? "Remover convidado" : "Remover convite"}
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que deseja remover esse{" "}
            {variant === "guest" ? "convidado" : "convite"} ?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button disabled={loading} onClick={rest.onClose}>
              Cancelar
            </Button>
            <Button
              disabled={loading}
              colorScheme="red"
              onClick={rest.onConfirm}
              ml={3}
            >
              {loading ? "Carregando..." : "Remover"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
