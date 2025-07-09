import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, QrCode } from "lucide-react";

interface CheckoutFormProps {
  onClose: () => void;
}

export const CheckoutForm = ({ onClose }: CheckoutFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    endereco: "",
    cidade: "",
    cep: "",
    opcaoPagamento: "pix",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Pedido Confirmado!",
      description:
        "Obrigado pela compra! Seu pedido foi recebido e será preparado com cuidado. Em breve você receberá um e-mail com as informações de envio.",
      duration: 6000,
    });

    setFormData({
      nomeCompleto: "",
      email: "",
      endereco: "",
      cidade: "",
      cep: "",
      opcaoPagamento: "pix",
    });

    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card border-border font-serif">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-deep-purple">
          Finalizar Compra
        </CardTitle>
        <p className="text-muted-foreground">Perfume Sete Saias - R$ 89,90</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome" className="text-deep-purple font-medium">
                Nome Completo *
              </Label>
              <Input
                id="nome"
                type="text"
                value={formData.nomeCompleto}
                onChange={(e) =>
                  handleInputChange("nomeCompleto", e.target.value)
                }
                required
                className="mt-1 border-muted-foreground/30 focus:border-primary"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-deep-purple font-medium">
                E-mail *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="mt-1 border-muted-foreground/30 focus:border-primary"
              />
            </div>

            <div>
              <Label
                htmlFor="endereco"
                className="text-deep-purple font-medium"
              >
                Endereço Completo *
              </Label>
              <Input
                id="endereco"
                type="text"
                value={formData.endereco}
                onChange={(e) => handleInputChange("endereco", e.target.value)}
                required
                className="mt-1 border-muted-foreground/30 focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label
                  htmlFor="cidade"
                  className="text-deep-purple font-medium"
                >
                  Cidade *
                </Label>
                <Input
                  id="cidade"
                  type="text"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange("cidade", e.target.value)}
                  required
                  className="mt-1 border-muted-foreground/30 focus:border-primary"
                />
              </div>
              <div>
                <Label htmlFor="cep" className="text-deep-purple font-medium">
                  CEP *
                </Label>
                <Input
                  id="cep"
                  type="text"
                  value={formData.cep}
                  onChange={(e) => handleInputChange("cep", e.target.value)}
                  required
                  className="mt-1 border-muted-foreground/30 focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-deep-purple font-medium mb-3 block">
              Forma de Pagamento *
            </Label>
            <RadioGroup
              value={formData.opcaoPagamento}
              onValueChange={(value) =>
                handleInputChange("opcaoPagamento", value)
              }
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 border border-muted rounded-lg hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="pix" id="pix" />
                <QrCode className="h-5 w-5 text-primary" />
                <Label htmlFor="pix" className="flex-1 cursor-pointer">
                  PIX (Desconto de 5%)
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border border-muted rounded-lg hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="cartao" id="cartao" />
                <CreditCard className="h-5 w-5 text-primary" />
                <Label htmlFor="cartao" className="flex-1 cursor-pointer">
                  Cartão de Crédito
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-primary text-primary hover:bg-primary/10"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-lavender-hover text-primary-foreground font-medium"
            >
              Confirmar Pedido
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
