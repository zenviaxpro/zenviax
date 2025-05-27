import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Loader2, Wand2, ListChecks, PenLine } from "lucide-react";

interface MessageComposerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

// Templates de mensagens de remarketing
const REMARKETING_TEMPLATES = [
  {
    id: "reengagement",
    title: "Reengajamento",
    description: "Para clientes inativos",
    content: "Olá {nome}! Sentimos sua falta! 😊 Que tal dar uma olhada nas novidades que preparamos especialmente para você? Temos ofertas exclusivas esperando por você! 🌟"
  },
  {
    id: "feedback",
    title: "Feedback",
    description: "Solicitar feedback do cliente",
    content: "Oi {nome}! Sua opinião é muito importante para nós. Como foi sua experiência com nosso produto/serviço? Adoraríamos ouvir seu feedback para melhorar ainda mais! 📝"
  },
  {
    id: "special_offer",
    title: "Oferta Especial",
    description: "Promoção personalizada",
    content: "Ei {nome}! 🎉 Preparamos uma oferta especial só pra você! Por ser um cliente especial, você tem 20% de desconto na sua próxima compra. Aproveite! 💫"
  },
  {
    id: "event",
    title: "Evento",
    description: "Convite para evento",
    content: "Olá {nome}! Temos um evento incrível chegando e você é nosso convidado especial! 🎈 Vamos ter novidades, networking e muito mais. Quer saber mais detalhes? 🤔"
  },
  {
    id: "loyalty",
    title: "Fidelidade",
    description: "Programa de fidelidade",
    content: "Oi {nome}! 🌟 Sabia que você está acumulando pontos em nosso programa de fidelidade? Já são {pontos} pontos que podem ser trocados por descontos incríveis!"
  }
];

// Opções de nicho de mercado
const MARKET_NICHES = [
  { value: "ecommerce", label: "E-commerce" },
  { value: "services", label: "Serviços" },
  { value: "food", label: "Alimentação" },
  { value: "beauty", label: "Beleza e Estética" },
  { value: "health", label: "Saúde e Bem-estar" },
  { value: "education", label: "Educação" },
  { value: "fashion", label: "Moda" },
  { value: "tech", label: "Tecnologia" },
  { value: "automotive", label: "Automotivo" },
  { value: "realestate", label: "Imobiliário" },
  { value: "fitness", label: "Academia e Fitness" },
  { value: "petshop", label: "Pet Shop" }
];

// Objetivos de remarketing
const REMARKETING_OBJECTIVES = [
  { 
    value: "reactivate_inactive", 
    label: "Reativar cliente inativo",
    description: "Para clientes que não compram há mais de 30 dias"
  },
  { 
    value: "upsell", 
    label: "Venda adicional (Upsell)",
    description: "Oferecer produto/serviço complementar"
  },
  { 
    value: "cross_sell", 
    label: "Venda cruzada (Cross-sell)",
    description: "Sugerir produtos relacionados"
  },
  { 
    value: "abandoned_cart", 
    label: "Carrinho abandonado",
    description: "Recuperar venda não finalizada"
  },
  { 
    value: "loyalty_program", 
    label: "Programa de fidelidade",
    description: "Engajar no programa de pontos/benefícios"
  },
  { 
    value: "feedback_request", 
    label: "Solicitar avaliação",
    description: "Pedir feedback após compra/serviço"
  },
  { 
    value: "win_back", 
    label: "Reconquistar cliente",
    description: "Recuperar cliente que migrou para concorrência"
  }
];

export function MessageComposer({ value, onChange, disabled }: MessageComposerProps) {
  const [mode, setMode] = useState<"manual" | "template" | "ai">("manual");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiContext, setAiContext] = useState({
    niche: "",
    objective: "",
    tone: "professional",
    specialOffer: "",
    lastPurchaseDays: "",
  });

  // Função para gerar mensagem com IA
  const generateAIMessage = async () => {
    setIsGenerating(true);
    try {
      // Aqui você implementará a chamada para sua API de IA
      // Por enquanto, vamos simular uma resposta após 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedObjective = REMARKETING_OBJECTIVES.find(obj => obj.value === aiContext.objective);
      const selectedNiche = MARKET_NICHES.find(niche => niche.value === aiContext.niche);
      
      const generatedMessage = `Olá {nome}! 

${selectedNiche ? `Como cliente especial da nossa ${selectedNiche.label}, ` : ""}${selectedObjective?.description}.

${aiContext.specialOffer ? `Preparamos uma oferta especial para você: ${aiContext.specialOffer}` : ""}
${aiContext.lastPurchaseDays ? `\nJá faz ${aiContext.lastPurchaseDays} dias desde sua última compra conosco. Que tal voltar?` : ""}

Aguardamos seu retorno!
Atenciosamente`;

      onChange(generatedMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  // Editor de texto comum que será usado em todos os modos
  const MessageEditor = () => (
    <div className="space-y-2">
      <Label htmlFor="message">Mensagem</Label>
      <Textarea
        id="message"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite sua mensagem..."
        className="min-h-[120px] bg-gray-900 border-gray-700 text-gray-100 placeholder:text-gray-500"
        disabled={disabled}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <PenLine className="h-4 w-4" />
            Manual
          </TabsTrigger>
          <TabsTrigger value="template" className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            IA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <MessageEditor />
        </TabsContent>

        <TabsContent value="template">
          <div className="space-y-6">
            <div className="grid gap-4">
              {REMARKETING_TEMPLATES.map((template) => (
                <Card 
                  key={template.id}
                  className="bg-gray-800 border-gray-700 cursor-pointer transition-colors hover:bg-gray-700"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-400">{template.content}</p>
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => onChange(template.content)}
                    >
                      Usar este template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <MessageEditor />
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Gerador de Mensagens de Remarketing</CardTitle>
              <CardDescription>
                Use IA para criar uma mensagem personalizada baseada no seu nicho e objetivo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nicho de Mercado</Label>
                <Select
                  value={aiContext.niche}
                  onValueChange={(v) => setAiContext({ ...aiContext, niche: v })}
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700">
                    <SelectValue placeholder="Selecione seu nicho" />
                  </SelectTrigger>
                  <SelectContent>
                    {MARKET_NICHES.map((niche) => (
                      <SelectItem key={niche.value} value={niche.value}>
                        {niche.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Objetivo do Remarketing</Label>
                <Select
                  value={aiContext.objective}
                  onValueChange={(v) => setAiContext({ ...aiContext, objective: v })}
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700">
                    <SelectValue placeholder="Selecione o objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    {REMARKETING_OBJECTIVES.map((objective) => (
                      <SelectItem key={objective.value} value={objective.value}>
                        {objective.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tom da mensagem</Label>
                <Select
                  value={aiContext.tone}
                  onValueChange={(v) => setAiContext({ ...aiContext, tone: v })}
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700">
                    <SelectValue placeholder="Selecione o tom" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Profissional</SelectItem>
                    <SelectItem value="friendly">Amigável e Casual</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                    <SelectItem value="exclusive">Exclusivo</SelectItem>
                    <SelectItem value="fun">Descontraído</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Oferta especial (opcional)</Label>
                <Input
                  placeholder="Ex: 20% de desconto, Frete grátis, etc"
                  value={aiContext.specialOffer}
                  onChange={(e) => setAiContext({ ...aiContext, specialOffer: e.target.value })}
                  className="bg-gray-900 border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label>Dias desde última compra (opcional)</Label>
                <Input
                  type="number"
                  placeholder="Ex: 30"
                  value={aiContext.lastPurchaseDays}
                  onChange={(e) => setAiContext({ ...aiContext, lastPurchaseDays: e.target.value })}
                  className="bg-gray-900 border-gray-700"
                />
              </div>

              <Button 
                onClick={generateAIMessage} 
                className="w-full"
                disabled={!aiContext.niche || !aiContext.objective || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Gerando mensagem...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Gerar mensagem
                  </>
                )}
              </Button>

              <MessageEditor />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 