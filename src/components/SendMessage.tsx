import { useState } from "react";
import { useWhatsApp } from "@/contexts/WhatsAppContext";
import { useStats } from "@/contexts/StatsContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Send, Loader2, CheckSquare } from "lucide-react";
import { toast } from "sonner";
import MessageIntervalConfig from "./MessageIntervalConfig";
import { MessageComposer } from "./MessageComposer";

export function SendMessage() {
  const { contacts, selectedContacts, sendBulkMessages, clearSelectedContacts } = useWhatsApp();
  const { incrementMessagesSent, incrementMessagesFailed } = useStats();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalSeconds, setIntervalSeconds] = useState(10);

  const handleSendMessages = async () => {
    if (selectedContacts.length === 0) {
      toast.error("Nenhum contato selecionado", {
        description: "Selecione pelo menos um contato para enviar a mensagem."
      });
      return;
    }

    if (!message.trim()) {
      toast.error("Mensagem vazia", {
        description: "Digite uma mensagem para enviar."
      });
      return;
    }

    if (intervalSeconds < 10) {
      toast.error("Intervalo muito curto", {
        description: "O intervalo mínimo entre mensagens é de 10 segundos."
      });
      return;
    }

    setIsSending(true);
    try {
      const selectedContactsList = contacts.filter(contact => 
        selectedContacts.includes(contact.id)
      );

      const result = await sendBulkMessages(
        selectedContactsList, 
        message.trim(), 
        intervalSeconds,
        (progress) => setProgress(progress)
      );
      
      // Atualizar estatísticas
      if (result.success > 0) {
        await incrementMessagesSent(result.success);
      }
      
      if (result.failed > 0) {
        await incrementMessagesFailed(result.failed);
      }

      if (result.success > 0) {
        setMessage("");
        clearSelectedContacts();
      }
    } finally {
      setIsSending(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Enviar Mensagem</h2>
        {selectedContacts.length > 0 && (
          <div className="p-3 bg-gray-700 rounded-md">
            <div className="flex items-center mb-2">
              <CheckSquare size={16} className="text-green-500 mr-2" />
              <p className="text-sm font-medium text-gray-200">
                {selectedContacts.length} contatos selecionados
              </p>
            </div>
            {selectedContacts.length <= 5 && (
              <div className="flex flex-wrap gap-2">
                {selectedContacts.map((contactId) => {
                  const contact = contacts.find(c => c.id === contactId);
                  return contact ? (
                    <div 
                      key={contactId} 
                      className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-600 rounded text-gray-200"
                    >
                      {contact.name}
                    </div>
                  ) : null;
                })}
              </div>
            )}
            {selectedContacts.length > 5 && (
              <p className="text-xs text-gray-300">
                {contacts.find(c => c.id === selectedContacts[0])?.name}, 
                {contacts.find(c => c.id === selectedContacts[1])?.name} e mais 
                {selectedContacts.length - 2} contatos
              </p>
            )}
          </div>
        )}
      </div>

      <MessageComposer
        value={message}
        onChange={setMessage}
        disabled={isSending}
      />

      <MessageIntervalConfig
        intervalSeconds={intervalSeconds}
        setIntervalSeconds={setIntervalSeconds}
        selectedContactsCount={selectedContacts.length}
      />

      <div className="space-y-4">
        <Button
          onClick={handleSendMessages}
          className="w-full gap-2"
          disabled={selectedContacts.length === 0 || !message.trim() || isSending}
        >
          {isSending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Enviar Mensagem
            </>
          )}
        </Button>
        
        {isSending && (
          <Progress value={progress} className="w-full" />
        )}
      </div>
    </div>
  );
} 