import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, QrCode, Loader2 } from "lucide-react";

interface CheckoutFormProps {
  onClose: () => void;
  selectedVariation?: {
    id: string;
    name: string;
    description: string;
  };
}

export const CheckoutForm = ({
  onClose,
  selectedVariation,
}: CheckoutFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    endereco: "",
    complemento: "",
    cidade: "",
    cep: "",
    opcaoPagamento: "pix",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderData = {
        customer: {
          name: formData.nomeCompleto,
          email: formData.email,
          address: {
            street: formData.endereco,
            complement: formData.complemento,
            city: formData.cidade,
            zip_code: formData.cep,
          },
        },
        product: {
          title: `Perfume Sete Saias - ${
            selectedVariation?.name || "Artesanal"
          }`,
          variation: selectedVariation?.name || "Feminino",
          unit_price: 237.0,
          quantity: 1,
        },
        payment_method: formData.opcaoPagamento,
      };

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:3001"
        }/api/create-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao processar pagamento");
      }

      const result = await response.json();

      if (result.success && result.payment_url) {
        toast({
          title: "Redirecionando para pagamento",
          description: "Aguarde o redirecionamento para finalizar a compra.",
          duration: 3000,
        });

        window.location.href = result.payment_url;
      } else {
        throw new Error(result.error || "Erro no processamento");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Erro no pagamento",
        description:
          "Ocorreu um erro ao processar seu pedido. Tente novamente.",
        duration: 5000,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-sete-dark border-sete-gold/30 font-body text-sete-cream">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-sete-gold font-title">
          Finalizar Compra
        </CardTitle>
        <div className="space-y-2">
          <p className="text-sete-cream/80 font-body">
            Perfume Sete Saias - {selectedVariation?.name || "Artesanal"}
          </p>
          <p className="text-sm text-sete-gold font-body">R$ 237,00</p>
          {selectedVariation && (
            <div className="bg-sete-dark/50 border border-sete-gold/30 rounded-lg p-3 mt-3">
              <p className="text-xs text-sete-cream/70 mb-1">
                Variação selecionada:
              </p>
              <p className="text-sm font-medium text-sete-cream">
                {selectedVariation.description}
              </p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="nome"
                className="text-sete-cream font-medium font-body"
              >
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
                disabled={isLoading}
                className="mt-1 border-sete-gold/30 focus:border-sete-gold bg-sete-dark/50 text-sete-cream"
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-sete-cream font-medium font-body"
              >
                E-mail *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                disabled={isLoading}
                className="mt-1 border-sete-gold/30 focus:border-sete-gold bg-sete-dark/50 text-sete-cream"
              />
            </div>

            <div>
              <Label
                htmlFor="endereco"
                className="text-sete-cream font-medium font-body"
              >
                Endereço Completo *
              </Label>
              <Input
                id="endereco"
                type="text"
                value={formData.endereco}
                onChange={(e) => handleInputChange("endereco", e.target.value)}
                required
                disabled={isLoading}
                className="mt-1 border-sete-gold/30 focus:border-sete-gold bg-sete-dark/50 text-sete-cream"
              />
            </div>

            <div>
              <Label
                htmlFor="complemento"
                className="text-sete-cream font-medium font-body"
              >
                Complemento (opcional)
              </Label>
              <Input
                id="complemento"
                type="text"
                value={formData.complemento}
                onChange={(e) =>
                  handleInputChange("complemento", e.target.value)
                }
                disabled={isLoading}
                placeholder="Apartamento, casa, bloco, etc."
                className="mt-1 border-sete-gold/30 focus:border-sete-gold bg-sete-dark/50 text-sete-cream"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label
                  htmlFor="cidade"
                  className="text-sete-cream font-medium font-body"
                >
                  Cidade *
                </Label>
                <Input
                  id="cidade"
                  type="text"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange("cidade", e.target.value)}
                  required
                  disabled={isLoading}
                  className="mt-1 border-sete-gold/30 focus:border-sete-gold bg-sete-dark/50 text-sete-cream"
                />
              </div>
              <div>
                <Label
                  htmlFor="cep"
                  className="text-sete-cream font-medium font-body"
                >
                  CEP *
                </Label>
                <Input
                  id="cep"
                  type="text"
                  value={formData.cep}
                  onChange={(e) => handleInputChange("cep", e.target.value)}
                  required
                  disabled={isLoading}
                  className="mt-1 border-sete-gold/30 focus:border-sete-gold bg-sete-dark/50 text-sete-cream"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sete-cream font-medium mb-3 block font-body">
              Forma de Pagamento *
            </Label>
            <RadioGroup
              value={formData.opcaoPagamento}
              onValueChange={(value) =>
                handleInputChange("opcaoPagamento", value)
              }
              disabled={isLoading}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 border border-sete-gold/30 rounded-lg hover:bg-sete-dark/70 transition-colors">
                <RadioGroupItem value="pix" id="pix" />
                <QrCode className="h-5 w-5 text-sete-gold" />
                <Label
                  htmlFor="pix"
                  className="flex-1 cursor-pointer text-sete-cream font-body"
                >
                  PIX
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border border-sete-gold/30 rounded-lg hover:bg-sete-dark/70 transition-colors">
                <RadioGroupItem value="cartao" id="cartao" />
                <CreditCard className="h-5 w-5 text-sete-gold" />
                <Label
                  htmlFor="cartao"
                  className="flex-1 cursor-pointer text-sete-cream font-body"
                >
                  Cartão de Crédito, Débito ou Boleto
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 border-sete-gold/50 text-sete-gold hover:bg-sete-gold/10 font-body"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-sete-red hover:bg-sete-red-hover text-sete-cream font-medium font-body"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processando...
                </>
              ) : (
                "Finalizar Compra"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
