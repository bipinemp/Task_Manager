import { registerUser } from "../apis/auth/auth";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { cn } from "../lib/utils";
import { registerSchema, TRegister } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSettled(data: any) {
      if (data.status === 201) {
        toast.success("Registered Successfully.");
        navigate("/login");
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    },
  });

  const onSubmit = (data: TRegister) => {
    mutate(data);
  };

  return (
    <Card className="mx-auto max-w-sm bg-zinc-100 border-primary/30 mt-20">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your details to register your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Username</Label>
            <Input
              {...register("name")}
              id="name"
              type="text"
              placeholder="John Doe"
              className={cn("py-5", {
                "border-destructive": errors?.name?.message,
              })}
            />
            {errors?.name?.message && (
              <span className="text-destructive text-xs font-semibold">
                * {errors?.name?.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
              className={cn("py-5", {
                "border-destructive": errors?.email?.message,
              })}
            />
            {errors?.email?.message && (
              <span className="text-destructive text-xs font-semibold">
                * {errors?.email?.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={cn("py-5", {
                "border-destructive": errors?.password?.message,
              })}
            />
            {errors?.password?.message && (
              <span className="text-destructive text-xs font-semibold">
                * {errors?.password?.message}
              </span>
            )}
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <span className="flex items-center gap-x-2">
                <Loader2 className="animate-spin size-5" /> Regestering...
              </span>
            ) : (
              "Regiser"
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Register;
