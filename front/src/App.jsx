import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRound, Mail, Lock } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <UserRound className="h-12 w-12 text-zinc-100" />
          </div>
          <CardTitle className="text-2xl text-center text-zinc-100">
            Bienvenido
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Ingresa tus credenciales para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white text-zinc-900"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white text-zinc-900"
              >
                Registro
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-200">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                    <Input
                      id="email"
                      placeholder="nombre@ejemplo.com"
                      type="email"
                      className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-zinc-200">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>
                </div>
                <Button className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200">
                  Iniciar Sesión
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name" className="text-zinc-200">
                    Nombre
                  </Label>
                  <div className="relative">
                    <UserRound className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                    <Input
                      id="register-name"
                      placeholder="Tu nombre"
                      className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-zinc-200">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                    <Input
                      id="register-email"
                      placeholder="nombre@ejemplo.com"
                      type="email"
                      className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-zinc-200">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                    <Input
                      id="register-password"
                      type="password"
                      className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>
                </div>
                <Button className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200">
                  Registrarse
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
