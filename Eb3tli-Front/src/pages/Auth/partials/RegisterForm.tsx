import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { authService } from "../../../services/authService"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Lock, Loader2, Mail, User } from "lucide-react"

interface RegisterFormProps {
    onSwitch: () => void
}

const registerSchema = z.object({
    fullname: z.string().min(3, "Full name must be at least 3 characters long"),
    username: z.string()
               .regex(/^[a-zA-Z0-9_]+$/, {message: "Username can only contain letters, numbers, and underscores"})
                .min(3, {message: "Username must be at least 3 characters long"})
                .max(12, {message:"Username is to long" })
                .transform(val => val.toLocaleLowerCase()),
    email: z.email({message: "Ivalid email address"}),
    password: z.string().min(6, {message:"Password must be at least 6 characters long"}),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {message: "Password do not match", path: ['confirmation']})

type RegisterFormValues = z.infer<typeof registerSchema>
const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitch }) => {
    {/*
        const {} = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullname: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })
        */}
        const { register, handleSubmit, formState: { errors } } = useForm({resolver: zodResolver(registerSchema)})

        const mutation = useMutation({
            mutationFn: authService.register,
            onSuccess: () => {
                onSwitch();
                toast.success("Account created successfully. Please check your email to verify your account.");
            },
            onError: (error) => {
                const msg = (error as { response?: { data?: { message?: string } } })
                    .response?.data?.message || "Regestration Faild"
                toast.error(msg)
            }
        }) 
        const onSubmit = (data: RegisterFormValues) => mutation.mutate(data);
    return <>
        <h2 className="text-2xl font-bold text-dark mb-2">Create Your Account</h2>
        <p className="text-gray-500 text-sm mb-8">Join our community</p>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="fullName" className="block text-gray-700 mb-2 text-sm">Full Name</label>
                <div className="relative mb-2">
                    <User className="absolute insset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2"/>
                    <input type="text" id="fullName" {...register("fullname")} placeholder="Enter your full name" className={`w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullname ? 'border-red-500' : 'border-gray-300'}`} />
                </div>
                {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
            </div>
            <div>
                <label htmlFor="username" className="block text-gray-700 mb-2 text-sm">UserName</label>
                <div className="relative mb-2">
                    <User className="absolute insset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2"/>
                    <input 
                        {...register('username')}
                        className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="johndoe"
                    />
                </div>
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 text-sm">Email</label>
                <div className="relative mb-2">
                    <Mail className="absolute insset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2"/>
                    <input 
                        {...register('email')}
                        type="email"
                        className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="you@example.com"
                    />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-gray-700 mb-2 text-sm">Password</label>
                <div className="relative mb-2">
                    <Lock className="absolute insset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2"/>
                    <input 
                        {...register('password')}
                        type="password"
                        className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="******"
                    />
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 text-sm">Confirm Password</label>
                <div className="relative mb-2">
                    <Lock className="absolute insset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2"/>
                    <input 
                        {...register('confirmPassword')}
                        type="password"
                        className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="******"
                    />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="mt-4 w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex justify-center items-center"
            >
                {mutation.isPending ? <Loader2 className="animate-spin size-5"/> : "Create Account"}
            </button>
        </form>

        <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <span onClick={onSwitch} className="text-primary font-medium cursor-pointer hover:underline">Sign In</span>
        </div>
    </>
}
export default RegisterForm


