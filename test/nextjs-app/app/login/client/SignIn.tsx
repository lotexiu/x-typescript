"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ReactWrapper } from "@lotexiu/react/components/implementations";
import { ReactClientComponent } from "@lotexiu/react/components/ReactComponent/ReactClientComponent";
import { Property } from "@lotexiu/typescript/natives/object/proxy/types";
import { Label } from "@radix-ui/react-label";
import { Lock, Mail } from "lucide-react";
import { ReactNode } from "react";


export const SignIn = ReactWrapper(
  class SignIn extends ReactClientComponent {
    email: string = "";
    password: string = "";

    onChanges(property: Property<this, keyof this>): void {
      
    }

    setupHooks(): void {
        
    }

    render(): ReactNode {
      return (
        <div className={cn(
          "absolute w-full h-full",
          "content-center justify-items-center",
          "bg-background/50"
        )}>
          <Card className="w-[40%] min-w-sm max-w-4xl">
            <CardHeader>
              <CardTitle>
                Sign In
              </CardTitle>
              <CardDescription>
                Please sign in to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    value={this.email}
                    onChange={({target})=>{ this.email = target.value; this.updateView()}}
                    disabled={false}
                  >
                    <Mail className="h-4 w-4 text-foreground" />
                  </Input>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={this.password}
                      onChange={({target})=>{ this.password = target.value; this.updateView()}}
                      disabled={false}
                    >
                      <Lock className="h-4 w-4 text-foreground"/>
                    </Input>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center">
                <p className="font-medium">Credenciais de teste:</p>
                <p>Email: admin@example.com</p>
                <p>Senha: admin123</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      )
    }
  }
)