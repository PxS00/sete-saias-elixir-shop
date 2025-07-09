import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";
import { Sparkles, Leaf, Heart, Instagram } from "lucide-react";
import perfumeImage from "@/assets/perfume-bottle.jpg";
import logo from "@/assets/ceu-de-lavanda-logo.png";

export const ProductSection = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const features = [
    { icon: Sparkles, text: "Artesanal", color: "text-primary" },
    { icon: Leaf, text: "Vegano", color: "text-green-600" },
    { icon: Heart, text: "Edição Limitada", color: "text-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-background font-serif">
      {/* Header */}
      <header className="w-full px-4 py-2 flex flex-col items-center gap-1">
        {/* Logo centralizada no topo, agora é um link */}
        <div className="w-full flex justify-center mb-0">
          <a href="#outras-fragrancias">
            <img
              src={logo}
              alt="Céu de Lavanda"
              className="h-40 md:h-48 lg:h-56 w-auto object-contain"
              style={{ minHeight: "10rem", maxHeight: "14rem" }}
            />
          </a>
        </div>
      </header>

      {/* Main Product Section */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-primary/10 p-8">
              <img
                src={perfumeImage}
                alt="Perfume Sete Saias"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
              Destaque
            </Badge>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-deep-purple mb-4 leading-tight break-words text-center">
                Perfume Sete Saias
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Fragrância artesanal da Céu de Lavanda
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-accent/50 px-4 py-2 rounded-full"
                  >
                    <feature.icon className={`h-4 w-4 ${feature.color}`} />
                    <span className="text-sm font-medium text-deep-purple">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price and CTA */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-deep-purple">
                  R$ 89,90
                </span>
                {/*
                <span className="text-muted-foreground line-through">
                  R$ 120,00
                </span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  25% OFF
                </Badge>
                */}
              </div>

              <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-lavender-hover text-primary-foreground text-lg py-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Comprar Agora
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md p-0 border-0">
                  <CheckoutForm onClose={() => setIsCheckoutOpen(false)} />
                </DialogContent>
              </Dialog>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Compra segura • Frete já incluso para todo Brasil
              </p>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-deep-purple mb-6">
                Sobre o Perfume
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Uma fragrância delicada e envolvente. Com notas de{" "}
                <strong>jasmim</strong>, <strong>mel</strong>,{" "}
                <strong>musk branco</strong> e <strong>baunilha</strong>, o Sete
                Saias é um perfume artesanal criado com cuidado.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Acalma e envolve, criado para mulheres que buscam uma fragrância
                delicada e marcante.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-deep-purple mb-4">
                Como Usar
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ideal para o dia ou noite.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Pode ser usado na pele ou em ambientes para criar uma atmosfera
                agradável.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Brand Story */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-deep-purple mb-6">
            Céu de Lavanda
          </h2>
          <p
            id="outras-fragrancias"
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Fragrâncias artesanais com identidade visual natural e tons lavanda
            suaves. Cada perfume é criado com ingredientes selecionados e muito
            cuidado.
            <br />
            <a
              href="https://drive.google.com/file/d/1VgfdFJYAG670jUA54uk9FvpzB4LLm3Kd/view?usp=sharing"
              className="text-primary hover:text-lavender-hover font-medium text-lg transition-colors ml-1"
            >
              Outras Fragrâncias
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-12 border-t border-border mt-20">
        <p className="text-muted-foreground mb-4">© 2025 Céu de Lavanda</p>
        <a
          href="https://instagram.com/ceu_de_lavanda"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-lavender-hover transition-colors"
        >
          <Instagram className="h-5 w-5" />
          Siga-nos no Instagram
        </a>
      </footer>
    </div>
  );
};
