
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите ваш email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    toast({
      title: "Инструкции отправлены",
      description: "Проверьте вашу электронную почту для сброса пароля",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">PriceWhisperer</h1>
          <p className="text-white/80">
            Отслеживайте цены, сравнивайте товары и экономьте деньги
          </p>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <Link 
              to="/auth" 
              className="text-sm flex items-center text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Назад к входу
            </Link>
            <CardTitle>Восстановление пароля</CardTitle>
            <CardDescription>
              Введите email, указанный при регистрации
            </CardDescription>
          </CardHeader>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Отправка..." : "Отправить инструкции"}
                </Button>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4 text-center py-6">
              <p>
                Инструкции по сбросу пароля отправлены на{" "}
                <span className="font-medium">{email}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Если вы не получили письмо, проверьте папку "Спам" или запросите повторную отправку.
              </p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
              >
                Отправить снова
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
