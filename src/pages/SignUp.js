import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';



const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email : "",
        password : "",
        confrimedPassword : "",
        name : "",
        profilePic : "",
    })

    const navigate = useNavigate()
    
    const handleChange = (e) => {
        const {name, value} = e.target;
    
        setData((preve)=>{
            return {
                ...preve,
                [name] : value
            }
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (data.password === data.confrimedPassword) {
          try {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
              method: SummaryApi.signUp.method,
              headers: {
                "Content-Type": "application/json" // Corrected Content-Type
              },
              body: JSON.stringify(data)
            });
      
            if (!dataResponse.ok) {
              throw new Error('Network response was not ok');
            }
      
            const dataApi = await dataResponse.json();

            if(dataApi.success){
                toast.success(dataApi.message)
                navigate("/login")
            }

            if(dataApi.error){
                toast.error(dataApi.message)
            }

          } catch (error) {
            console.error('There was an error!', error);
          }
        } else {
          console.log("Password does not match the confirmed password");
        }
      };

    const handleUploadPic = async(e) => {
        const file = e.target.files[0];

        const imagepic = await imageToBase64(file)
        
        setData((preve)=>{
            return {
                ...preve,
                profilePic : imagepic
            }
        })
    }

    
  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || loginIcons} alt="login icons"/>
                    </div>
                    <form>
                        <label>
                            <div className='text-xs bg-slate-200 bg-opacity-85 pb-4 pt-2 text-center cursor-pointer absolute bottom-0 w-full'>
                                Upload Photo 
                            </div>
                            <input type="file" className='hidden' onChange={handleUploadPic} />
                        </label>
                    </form>
                </div>

                <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>

                    <div className='grid'>
                        <lable>Name :  </lable>
                        <div className='bg-slate-100 p-2'>
                            <input 
                            type="text" 
                            placeholder='Enter Your Name' 
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div className='grid'>
                        <lable>Email :  </lable>
                        <div className='bg-slate-100 p-2'>
                            <input 
                            type="email" 
                            placeholder='Enter Email' 
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div>
                        <lable>Password :  </lable>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder='Enter Password' 
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                <span>
                                    {
                                        showPassword ? (
                                            <FaEyeSlash />

                                        )
                                        :
                                        (
                                            <FaEye />
                                        
                                        )
                                    }
                                </span>    
                            </div>
                        </div>
                    </div>

                    <div>
                        <lable>Confirm Password :  </lable>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder='Reenter Password' 
                            name='confrimedPassword'
                            value={data.confrimedPassword}
                            onChange={handleChange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                <span>
                                    {
                                        showConfirmPassword ? (
                                            <FaEyeSlash />

                                        )
                                        :
                                        (
                                            <FaEye />
                                        
                                        )
                                    }
                                </span>    
                            </div>
                        </div>
                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
                </form>

                <p className='my-5'>Already have account ? <Link to={"/login"} className='hover:text-red-700 text-red-600 hover:underline'>Login</Link></p>
            </div>
        </div>
    </section>
  )
}
export default SignUp
