import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CustomHeader } from "@/components/CustomHeader";
import { Check, MessageCircle, Users, Zap, BarChart3, Shield, Calculator, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { PricingPlans } from '@/components/PricingPlans';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <CustomHeader />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Marketing em Massa via WhatsApp
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Automatize suas mensagens, gerencie contatos e aumente suas vendas com nossa plataforma profissional de marketing via WhatsApp.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Criar Conta Grátis
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Benefícios Section */}
        <section className="py-16 border-t border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Por que escolher nossa plataforma?</h2>
            <p className="text-gray-400">
              Benefícios que fazem a diferença para seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-blue-600/10 rounded-lg">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Rápido e Eficiente</h3>
              </div>
              <p className="text-gray-400">
                Envie mensagens em massa para seus contatos em questão de minutos, com alta taxa de entrega e desempenho otimizado.
              </p>
            </Card>

            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-blue-600/10 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Seguro e Confiável</h3>
              </div>
              <p className="text-gray-400">
                Sua conta do WhatsApp e dados estão protegidos com as mais recentes tecnologias de segurança e criptografia.
              </p>
            </Card>

            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-blue-600/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Métricas Detalhadas</h3>
              </div>
              <p className="text-gray-400">
                Acompanhe o desempenho de suas campanhas com estatísticas em tempo real e relatórios detalhados.
              </p>
            </Card>
          </div>
        </section>

        {/* Custo por Mensagem Section */}
        <section className="py-16 border-t border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Custo por Mensagem</h2>
            <p className="text-gray-400">
              Entenda o valor do seu investimento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-green-600/10 rounded-lg">
                  <Calculator className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">Plano Free</h3>
              </div>
              <p className="text-2xl font-bold text-green-500 mb-2">R$ 0,00</p>
              <p className="text-gray-400">
                500 mensagens/mês
                <br />
                <span className="text-sm">Custo por mensagem: R$ 0,00</span>
              </p>
            </Card>

            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-blue-600/10 rounded-lg">
                  <Calculator className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Plano Pro</h3>
              </div>
              <p className="text-2xl font-bold text-blue-500 mb-2">R$ 49,90</p>
              <p className="text-gray-400">
                5.000 mensagens/mês
                <br />
                <span className="text-sm">Custo por mensagem: R$ 0,01</span>
              </p>
            </Card>

            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-purple-600/10 rounded-lg">
                  <Calculator className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold">Plano Business</h3>
              </div>
              <p className="text-2xl font-bold text-purple-500 mb-2">R$ 99,90</p>
              <p className="text-gray-400">
                50.000 mensagens/mês
                <br />
                <span className="text-sm">Custo por mensagem: R$ 0,002</span>
              </p>
            </Card>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section className="py-16 border-t border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-gray-400">
              Comece a usar em 3 passos simples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Importe seus Contatos</h3>
              <p className="text-gray-400">
                Faça upload de sua lista de contatos via CSV ou adicione manualmente
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Crie sua Mensagem</h3>
              <p className="text-gray-400">
                Personalize sua mensagem com texto, emojis e variáveis dinâmicas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Envie e Acompanhe</h3>
              <p className="text-gray-400">
                Dispare suas mensagens e monitore os resultados em tempo real
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 border-t border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Planos e Preços</h2>
            <p className="text-gray-400">
              Escolha o plano ideal para o seu negócio
            </p>
          </div>

          <PricingPlans />
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-gray-800">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Comece Agora Mesmo</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Experimente gratuitamente e descubra como nossa plataforma pode ajudar seu negócio a crescer com marketing via WhatsApp.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Criar Conta Grátis
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 Zenviax. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home; 