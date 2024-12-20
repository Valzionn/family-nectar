import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { loginUser, registerUser } from '../services/api';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.username}!`,
      });
      navigate("/index");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
      });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        email: regEmail,
        passwordHash: regPassword,
        username: regUsername
      });
      toast({
        title: "Registration successful",
        description: "You can now log in!",
      });
      setModalIsOpen(false);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong, please try again.",
      });
    }
  };

  useEffect(() => {
    console.log("Modal open state:", modalIsOpen);
  }, [modalIsOpen]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/20 to-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <h2 className="text-2xl font-bold">Welcome back!</h2>
          <p className="text-muted-foreground">Sign in to your family account</p>
        </CardHeader>
        <form onSubmit={handleLoginSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="family@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <span
                className="text-primary hover:underline cursor-pointer"
                onClick={() => {
                  console.log("Create one clicked");
                  setModalIsOpen(true);
                }}
              >
                Create one
              </span>
            </p>
          </CardFooter>
        </form>
      </Card>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Register"
        className="fixed inset-0 flex items-center justify-center z-50 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        <div style={{ color: 'black' }}>
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <p className="text-muted-foreground">Sign up for a new family account</p>
          <form onSubmit={handleRegisterSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="regEmail">Email</Label>
                <Input
                  id="regEmail"
                  type="email"
                  placeholder="family@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="regUsername">Username</Label>
                <Input
                  id="regUsername"
                  type="text"
                  placeholder="Username"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="regPassword">Password</Label>
                <Input
                  id="regPassword"
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4 mt-4">
              <Button type="submit" className="w-full">
                Register
              </Button>
              <Button variant="ghost" onClick={() => setModalIsOpen(false)} className="w-full">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Login;