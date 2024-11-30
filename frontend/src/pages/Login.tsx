import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, TLogin } from "@/schemas/authSchema";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/apis/auth/auth";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSettled(Response: any) {
      console.log("Response : ", Response);
      if (Response.status === 200) {
        setAuth({
          id: Response.data.user.id,
          name: Response.data.user.name,
          email: Response.data.user.email,
          accessToken: Response.data.user.accessToken,
        });
        toast.success("LoggedIn Successfully.");
        navigate("/dashboard");
      } else if (Response.status === 400) {
        toast.error(Response.response.data.message);
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    },
  });

  const onSubmit = (data: TLogin) => {
    mutate(data);
  };

  return (
    <Card className="mx-auto max-w-sm mt-20 bg-zinc-100 border-primary/30">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="m@example.com"
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
              {...register("password")}
              id="password"
              type="password"
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
                <Loader2 className="animate-spin size-5" /> LoggingIn...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
