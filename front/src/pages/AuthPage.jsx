import { LoginForm } from "@/components/form/auth/LoginForm";
import { RegisterForm } from "@/components/form/auth/RegisterForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";
import { TabsContent } from "@radix-ui/react-tabs";

export const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-4xl bg-white shadow-lg">
        <CardContent className="pt-6">
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Icon icon="lucide:lock" className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-700">Domina App</h1>
            </div>
          </div>

          {/* tabs */}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar sesión</TabsTrigger>

              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
