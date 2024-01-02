import { Button, IconButton } from "@/components/Button";
import {
  CheckboxList,
  Content,
  Footer,
  Form,
  Header,
  Subtitle,
  Title,
} from "./styles";
import { X } from "@phosphor-icons/react";
import { useDialog } from "@/components/Dialog/context/hook";
import { Input, Label } from "@/components/Input";
import { Column, Row } from "@/components/Layout";
import { Checkbox } from "@/components/Ark/Checkbox";
import { useInviteForm } from "./hook";
import { Controller } from "react-hook-form";

export const InviteForm = () => {
  const { setOpen } = useDialog();
  const {
    guestsFields,
    control,
    getValues,
    include,
    guestSearch,
    handleSubmit,
    handleConfirm,
  } = useInviteForm();

  return (
    <Content>
      <Header>
        <Title>Novo convite</Title>
        <IconButton onClick={() => setOpen(false)}>
          <X size={20} />
        </IconButton>
      </Header>
      <Form>
        <Column>
          <Label>Convite</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input placeholder="Nome do convite" {...field} />
            )}
          />
        </Column>
        <Column>
          <Label>Convidados neste convite</Label>
          <Controller
            name="guestSearch"
            control={control}
            render={({ field }) => (
              <Input placeholder="Pesquisar paciente" {...field} />
            )}
          />
          <CheckboxList>
            {guestsFields?.map((field, index) => (
              <>
                {include(getValues(`guests.${index}.name`), guestSearch) && (
                  <Controller
                    control={control}
                    key={field.id}
                    name={`guests.${index}.enabled`}
                    render={({ field: { ref, onBlur, ...rest } }) => (
                      <Checkbox
                        {...rest}
                        label={getValues(`guests.${index}.name`)}
                      />
                    )}
                  />
                )}
              </>
            ))}
          </CheckboxList>
        </Column>
      </Form>
      <Footer>
        <Button
          justifyContent="center"
          w="100%"
          variant="primary"
          onClick={handleSubmit(handleConfirm as any)}
        >
          Salvar
        </Button>
      </Footer>
    </Content>
  );
};
