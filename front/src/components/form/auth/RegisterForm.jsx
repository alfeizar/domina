import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { useUser } from "@/hooks/useUser";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  email: yup.string().email("Email invalido").required("El email es requerido"),

  password: yup
    .string()
    .required("password es requerido")
    .min(4, "El password debe tener al menos 4 caracteres"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("La confirmacion de la contraseña es requerida"),
});

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { handleRegister } = useUser();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(registerSchema),
  });

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
        {/* name input */}
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                <Label htmlFor="name" className="capitalize">
                  nombre
                </Label>

                <div className="relative">
                  <Icon
                    icon="lucide:user"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />

                  <Input
                    id="name"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Ingrese el nombre"
                    autoFocus
                    className="pl-10"
                  />
                </div>
              </div>
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* email input */}
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                <Label htmlFor="email" className="capitalize">
                  correo
                </Label>

                <div className="relative">
                  <Icon
                    icon="lucide:at-sign"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />

                  <Input
                    id="email"
                    type="email"
                    value={value}
                    onChange={onChange}
                    placeholder="Ingrese el correo electronico"
                    className="pl-10"
                  />
                </div>
              </div>
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* password input */}
        <div>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                <Label htmlFor="password" className="capitalize">
                  contraseña
                </Label>

                <div className="relative">
                  <Icon
                    icon="lucide:key"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder="Ingrese la contraseña"
                    className="pl-10"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Icon
                        icon="lucide:eye"
                        className="h-4 w-4 text-gray-400"
                      />
                    ) : (
                      <Icon
                        icon="lucide:eye-off"
                        className="h-4 w-4 text-gray-400"
                      />
                    )}
                  </Button>
                </div>
              </div>
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* confirmpassword input */}
        <div>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="capitalize">
                  confirmar contraseña
                </Label>

                <div className="relative">
                  <Icon
                    icon="lucide:key"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />

                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder="Ingrese la confirmación de la contraseña"
                    className="pl-10"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Icon
                        icon="lucide:eye"
                        className="h-4 w-4 text-gray-400"
                      />
                    ) : (
                      <Icon
                        icon="lucide:eye-off"
                        className="h-4 w-4 text-gray-400"
                      />
                    )}
                  </Button>
                </div>
              </div>
            )}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 capitalize"
        >
          registrar
        </Button>
      </form>
    </div>
  );
};
