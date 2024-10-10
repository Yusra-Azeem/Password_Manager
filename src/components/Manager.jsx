import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from 'react'

const Manager = () => {
    const imgref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords= async ()=>{
        let req=await fetch(`http://localhost:3000/api`)
            let passwords =await req.json()
            console.log(passwords)
            setpasswordArray(passwords)    
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const showpassword = () => {
        if (imgref.current.src.includes("icons/eyeshut.png")) {
            imgref.current.src = "icons/eye.png"
            passwordref.current.type = "text"
        } else {
            imgref.current.src = "icons/eyeshut.png"
            passwordref.current.type = "password"
        }
    }
    const savepassword = async() => {
        if(form.site.length>3&&form.username.length>3&&form.password.length>3){
        await fetch("http://localhost:3000/api",{method: "DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id: form.id})}) 
        setpasswordArray([...passwordArray, {...form, "id":uuidv4()}])
        await fetch("http://localhost:3000/api",{method: "POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id :uuidv4()})})
        //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, "id":uuidv4()}]))
        console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
        toast('Password Saved Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",            
            });   
        }else{
            toast.error('Error Password not saved',{
                theme: "dark"
            });
            
        
        }
    }

    const deletepassword =async (id) => {

        let c=confirm("Do you want to delete this password?")
        if(c){
        console.log("Deleting password with id", id)
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        let res=await fetch("http://localhost:3000/api",{method: "DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})
        //localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id))) 
        toast('Password Deleted Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",            
            });   
        } 
    }
    const editpassword = (id) => {
        console.log("Editing password with id", id)
        setform({...passwordArray.filter(i=>i.id===id)[0],id:id})
        setpasswordArray(passwordArray.filter(item=>item.id!==id))  
         
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copytext = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",            
            });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="p-2 md:p-0 md:mycontainer">
                <div className="text-4xl font-bold text-center">
                    <span className="text-purple-700"> &lt;</span>
                    <span className='text-white'>Pass</span>
                    <span className="text-purple-700">OP/&gt;</span>
                    <p className='text-white text-lg gap-8 text-center'>Your Password Manager</p>
                </div>
                <div className='flex flex-col items-center p-4 text-purple gap-8'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='p-4 py-1 rounded-full border w-full border-purple-800' type="text" name="site" id="site" />
                    <div className="flex md:flex-row flex-col w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter UserName' className='p-4 py-1 rounded-full border w-full border-purple-800' type="text" name="username" id="username" />
                        <div className="relative">

                            <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password' className='p-4 py-1 rounded-full border w-full border-purple-800' type="password" name="password" id="password" />
                            <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showpassword}>
                                <img ref={imgref} className='p-1' width={26} src="icons/eyeshut.png" alt="eye" /></span>
                        </div>
                    </div>
                    <button onClick={savepassword} className=' font-semibold flex justify-center items-center bg-purple-400 border-2 border-purple-950 hover:bg-purple-300 rounded-full px-2 py-2 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon >
                        Save Password</button>

                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4 flex text-white justify-center items-center'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-white flex justify-center'>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-purple-800 border-2 border-purple-950'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>UserName</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>

                                </tr>
                            </thead>
                            <tbody className='bg-purple-400'>
                                {passwordArray.map((items, index) => {
                                    return <tr key={index}>

                                        <td className='py-2 border border-white text-center w-32'><a href={items.site} target='_blank'>{items.site}</a>

                                            
                                            <span className='cursor-pointer ' onClick={() => { copytext(items.site) }}>
                                                <i className="fa fa-copy flex p-2"></i>      </span>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>{items.username}

                                            
                                            <span className='cursor-pointer' onClick={() => { copytext(items.username) }}>
                                                <i className=" cursor-pointer fa fa-copy p-2"></i> </span>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>{"*".repeat(items.password.length)}

                                            
                                            <span className='cursor-pointer' onClick={() => { copytext(items.password) }}>
                                                <i className="fa fa-copy p-2"></i> </span>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>
                                        
                                         <i className="fa fa-edit cursor-pointer p-2" onClick={()=>{editpassword(items.id)}}></i>
                                         <i className="fa fa-trash-o cursor-pointer" onClick={()=>{deletepassword(items.id)}}></i>
                                        </td>
                                    </tr>
                                }
                                )}

                            </tbody>
                        </table>}

                </div>
            </div>
        </>
    )
}


export default Manager
