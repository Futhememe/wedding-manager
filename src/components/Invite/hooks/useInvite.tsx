import { useEffect } from "react";
import { toast } from "sonner";
import { useClipboard } from "./useClipboard";

interface IUseInvite {
  inviteId: string;
}

export const useInvite = ({ inviteId }: IUseInvite) => {
  const content = `Queridos amigos e familiares,\nÉ com muita alegria que convidamos para celebrar esse momento especial conosco. Nosso casamento!✨\n\nPara facilitar a organização, optamos por utilizar um site como convite oficial. Nele, vocês encontrarão todas as informações necessárias, incluindo, o horário da cerimônia, o local da festa, a lista de presentes e outras informações importantes.\n\nAcessem nosso site https://wedding.withgu.com/${inviteId} para confirmar presença e obter todos os detalhes. Esperamos ansiosamente por esse dia e pela presença de cada um de vocês!\n\nGustavo e Esther ❤️`;

  const { hasCopied, onCopy: onCopyToClipboard } = useClipboard(content);

  function sendWhatsapp(phone: string) {
    const url = new URL(`/${phone}`, "https://wa.me");
    url.searchParams.set("text", content);

    window.open(url.toString(), "_blank");
  }

  function onCopy() {
    onCopyToClipboard();
    toast.success("Texto copiado !!");
  }

  return {
    onCopy,
    sendWhatsapp,
  };
};
