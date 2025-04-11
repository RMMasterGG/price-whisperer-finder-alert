
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgePercent, LineChart, Bell } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl text-brand-700">PriceWhisperer</span>
          </div>
          <div>
            <Button onClick={() => navigate("/auth")}>Войти</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Отслеживайте цены и экономьте на покупках
              </h1>
              <p className="text-xl mb-8 text-white/90">
                PriceWhisperer поможет вам отслеживать изменения цен на маркетплейсах,
                сравнивать товары и получать уведомления о скидках.
              </p>
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="bg-white text-brand-800 hover:bg-white/90"
                >
                  Начать бесплатно
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-lg p-4 flex items-center">
                    <div className="bg-brand-600 p-3 rounded-lg mr-4">
                      <LineChart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">История цен</h3>
                      <p className="text-sm text-white/80">
                        Отслеживайте изменения цен во времени
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 flex items-center">
                    <div className="bg-brand-600 p-3 rounded-lg mr-4">
                      <BadgePercent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Скидки и акции</h3>
                      <p className="text-sm text-white/80">
                        Узнавайте о лучших предложениях
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 flex items-center">
                    <div className="bg-brand-600 p-3 rounded-lg mr-4">
                      <Bell className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Уведомления</h3>
                      <p className="text-sm text-white/80">
                        Получайте оповещения о снижении цен
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Как PriceWhisperer помогает экономить
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Отслеживание цен</h3>
              <p className="text-gray-600">
                Добавляйте товары с маркетплейсов и следите за изменением их стоимости
                в реальном времени.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BadgePercent className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Сравнение товаров</h3>
              <p className="text-gray-600">
                Легко сравнивайте аналогичные товары с разных площадок, чтобы
                выбрать лучшее предложение.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Умные уведомления</h3>
              <p className="text-gray-600">
                Получайте оповещения о снижении цены и появлении скидок на
                отслеживаемые товары.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Начните экономить прямо сейчас
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам пользователей, которые уже экономят на
            покупках с помощью PriceWhisperer.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-brand-600 hover:bg-brand-700"
          >
            Начать бесплатно
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-xl">PriceWhisperer</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 PriceWhisperer. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
