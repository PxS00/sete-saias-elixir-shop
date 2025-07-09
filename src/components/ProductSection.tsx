import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";
import { Sparkles, Leaf, Heart, Instagram } from "lucide-react";
import perfumeImage from "@/assets/sete-saias-perfume.jpg";
import logo from "@/assets/Logo Sete Saias.svg";

export const ProductSection = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState("feminino");

  const features = [
    { icon: Sparkles, text: "Artesanal", color: "text-sete-gold" },
    { icon: Leaf, text: "Vegano", color: "text-sete-gold" },
    { icon: Heart, text: "Edição Limitada", color: "text-sete-red" },
  ];

  const variations = [
    {
      id: "feminino",
      name: "Feminino",
      description: "Fragrância floral e delicada",
    },
    {
      id: "masculino",
      name: "Masculino",
      description: "Fragrância amadeirada e marcante",
    },
  ];

  const currentVariation = variations.find((v) => v.id === selectedVariation);

  return (
    <div className="min-h-screen bg-sete-dark font-body text-sete-cream">
      <header className="w-full px-4 py-2 flex flex-col items-center gap-1">
        <div className="w-full flex justify-center mb-0">
          <a href="#outras-fragrancias">
            <img
              src={logo}
              alt="Sete Saias"
              className="h-40 md:h-48 lg:h-56 w-auto object-contain"
              style={{ minHeight: "10rem", maxHeight: "14rem" }}
            />
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-sete-red/10 to-sete-gold/10 p-8 border border-sete-gold/20">
              <img
                src={perfumeImage}
                alt="Perfume Sete Saias"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            <Badge className="absolute top-4 right-4 bg-sete-red text-sete-cream px-4 py-2 text-sm font-medium">
              Destaque
            </Badge>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-title font-bold text-sete-cream mb-4 leading-tight break-words text-center">
                Perfume Sete Saias
              </h1>
              <p className="text-xl text-sete-cream/80 mb-6 text-center font-body">
                Fragrância artesanal
              </p>

              <div className="flex flex-wrap gap-3 mb-8 justify-center">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-sete-dark/50 border border-sete-gold/30 px-4 py-2 rounded-full"
                  >
                    <feature.icon className={`h-4 w-4 ${feature.color}`} />
                    <span className="text-sm font-medium text-sete-cream">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-sete-dark/50 border border-sete-gold/30 rounded-2xl p-6">
              <h3 className="text-lg font-title font-bold text-sete-gold mb-4 text-center">
                Escolha sua Variação
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {variations.map((variation) => (
                  <label
                    key={variation.id}
                    className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                      selectedVariation === variation.id
                        ? "border-sete-gold bg-sete-gold/10"
                        : "border-sete-gold/30 hover:border-sete-gold/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="variation"
                      value={variation.id}
                      checked={selectedVariation === variation.id}
                      onChange={(e) => setSelectedVariation(e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <h4
                        className={`font-title font-bold text-lg mb-2 ${
                          selectedVariation === variation.id
                            ? "text-sete-gold"
                            : "text-sete-cream"
                        }`}
                      >
                        {variation.name}
                      </h4>
                      <p
                        className={`text-sm font-body ${
                          selectedVariation === variation.id
                            ? "text-sete-cream"
                            : "text-sete-cream/70"
                        }`}
                      >
                        {variation.description}
                      </p>
                    </div>
                    {selectedVariation === variation.id && (
                      <div className="absolute top-2 right-2">
                        <div className="w-3 h-3 bg-sete-gold rounded-full"></div>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-sete-dark/80 border border-sete-gold/30 rounded-2xl p-6">
              <div className="flex items-baseline gap-3 mb-6 justify-center">
                <span className="text-4xl font-title font-bold text-sete-gold">
                  R$ 237,00
                </span>
              </div>

              <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="w-full bg-sete-red hover:bg-sete-red-hover text-sete-cream text-lg py-6 rounded-xl font-medium font-body shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Comprar Agora
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md p-0 border-0">
                  <CheckoutForm
                    onClose={() => setIsCheckoutOpen(false)}
                    selectedVariation={currentVariation}
                  />
                </DialogContent>
              </Dialog>

              <p className="text-center text-sm text-sete-cream/70 mt-4 font-body">
                Compra segura - Frete grátis para todo Brasil
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 border-sete-gold/30 bg-sete-dark/50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-title font-bold text-sete-gold mb-6">
                Sobre o Perfume
              </h2>
              <p className="text-sete-cream/90 leading-relaxed text-lg mb-6 font-body">
                Perfume artesanal disponível em duas versões: Feminino com
                fragrância floral e delicada, e Masculino com fragrância
                amadeirada e marcante.
              </p>
              <p className="text-sete-cream/90 leading-relaxed text-lg font-body">
                Cada variação é criada com ingredientes selecionados.
              </p>
            </CardContent>
          </Card>

          <Card className="border-sete-gold/30 bg-sete-dark/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-title font-bold text-sete-gold mb-4">
                Como Usar
              </h3>
              <p className="text-sete-cream/90 leading-relaxed mb-4 font-body">
                Use sobre a pele ou em ambientes para despertar a energia do dia
                ou da noite.
              </p>
              <p className="text-sete-cream/90 leading-relaxed mb-4 font-body">
                Aplique com intenção: para atrair, encantar, proteger ou
                transformar.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p
            id="outras-fragrancias"
            className="text-lg text-sete-cream/90 leading-relaxed font-body"
          >
            Perfumes artesanais únicos, criados com ingredientes selecionados e
            muito cuidado. Cada fragrância conta uma história e desperta
            sensações únicas.
          </p>
        </div>
      </main>

      <footer className="text-center py-12 border-t border-sete-gold/30 mt-20">
        <p className="text-sete-cream/70 mb-4 font-body">© 2025 Sete Saias</p>
        <a
          href="https://instagram.com/setesaias_oficial"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sete-gold hover:text-sete-gold/80 transition-colors font-body"
        >
          <Instagram className="h-5 w-5" />
          @setesaias_oficial
        </a>
      </footer>
    </div>
  );
};
