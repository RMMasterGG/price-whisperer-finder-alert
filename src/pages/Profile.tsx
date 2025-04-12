
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { User, LogOut, Settings } from "lucide-react";

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Вы вышли из системы",
      description: "Успешный выход из аккаунта",
    });
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Профиль пользователя</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <div className="bg-brand-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <User className="h-10 w-10 text-brand-600" />
            </div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ID пользователя: {user.id}
            </p>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button 
              variant="outline" 
              className="w-full flex justify-start" 
              onClick={() => navigate("/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Настройки аккаунта
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex justify-start text-rose-500 hover:text-rose-600" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Выйти из аккаунта
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Активность</CardTitle>
            <CardDescription>
              Сводка вашей активности на платформе
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded p-4">
                <h3 className="font-medium mb-1">Отслеживаемые товары</h3>
                <p className="text-3xl font-bold">0</p>
              </div>
              
              <div className="border rounded p-4">
                <h3 className="font-medium mb-1">Сохранено денег</h3>
                <p className="text-3xl font-bold">0 ₽</p>
              </div>
              
              <Button className="w-full" onClick={() => navigate("/dashboard")}>
                Перейти к отслеживанию цен
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
