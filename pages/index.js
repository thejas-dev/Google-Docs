import MoreVertIcon from '@mui/icons-material/MoreVert'
import FolderIcon from '@mui/icons-material/Folder'
import { Button } from "@material-tailwind/react";
import Head from 'next/head'
import Image from 'next/image'
import {useState,useEffect} from 'react'
import Header from '../components/Header'
import {getSession, useSession} from 'next-auth/react'
import Login from '../components/Login'
import {db,storage} from '../firebase'
import  {serverTimestamp } from 'firebase/firestore'
import DocumentRow from '../components/DocumentRow'
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { doc,collection, setDoc, getDocs, addDoc, getDoc, orderBy } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';


const NextPage = () => {
	const [showModal,setShowModal] = useState(false);
	const{data: session} = useSession();

	// if no session log out the user
	if(!session) return (<Login />)

	const [input,setInput] = useState('')

	// ref path for useColletion
	const colRef = collection(db,'userDocs',session?.user?.email,"docs");
	
	const [snapshot] = useCollection(colRef,orderBy("timestamp", "desc"));
	
	const createDocument = async() =>{
		if(!input) return;
		if(db.length<0) return;

		let name = {
			fileName2: input,
			timestamp: serverTimestamp(),
		}
		// const res = await setDoc(doc(db, "userDocs", session?.user?.email, "docs",input),name);
		addDoc(colRef,{
			fileName: input,
			timestamp: serverTimestamp(),
		}).then((data)=>console.log(data.id)).catch(err=>alert(err));

		// const res =  db.collection('userDocs').doc(session?.user?.email).collection('docs').add({
		// 	fileName: input,
		// 	timestamp: serverTimestamp(),
		// })
		setShowModal(false);
		setInput('')
	}
	
	useEffect(()=>{
		// const Document = doc(db,'userDocs',session?.user?.email);
		// const res = getDocs(Document)
		// const res2 = getDoc(res)
		// console.log(res2)
		console.log(snapshot?.docs);

	},[snapshot])
	
	

		const dialog = (
				<Dialog size="xl" open={showModal} handler={()=> setShowModal(false)}>
					<DialogBody>
						<input 
						value={input}
						onChange={(e)=>setInput(e.target.value)}
						type="text"
						className="outline-none text-black mx-5 mt-2 w-full"
						placeholder="Enter Name of Document...."
						onKeyDown={(e)=>e.key==="Enter" && createDocument()}
						/>
					</DialogBody>
					<DialogFooter>
						<Button
						color="blue"
						ripple={true}
						className="mr-5 bg-transparent text-blue-500"
						onClick={(e)=>{
							setInput('')
							setShowModal(false)
						}}
						>
						Cancel
						</Button>
						<Button
						color="blue"
						onClick={createDocument}
						ripple={true}
						>
						Create
						</Button>
					</DialogFooter>
				</Dialog>
			)



  return (
    <div>
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    
      <Header/>
      {dialog}
{/*[#F8F9FA]*/}
      <section className="bg-gray-100 pb-10 px-10 overflow-y-hidden" >
      	<div className="max-w-3xl overflow-x-hidden mx-auto">
      		<div className="flex items-center justify-between py-6">
      			<h2 className="text-gray-800 text-lg">Start a New Document</h2>
      			<Button
      			color="gray"
      			
      			variant="text"
      			className="transition duration-300 ease-in-out border-0 rounded-lg">
      				<MoreVertIcon className="text-3xl" />
      			</Button>
      		</div>
      		<div >
      		<div 
      		onClick={()=>setShowModal(true)}
      		className="relative h-52 w-40 cursor-pointer hover:border-blue-700 transition duration-300 ease-in-out border-2" >
      			<Image src="https://links.papareact.com/pju" 
      			layout="fill"
      			/>
      		</div>
      			<p className="ml-2 font-semibold text-sm mt-2
      			text-gray-700">
      			Blank
      			</p>
      		</div>
      	</div>
      </section>

      <section className="bg-white px-10 md:px-0" >
      	<div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
      		<div className="flex items-center justify-between pb-5" >
      			<h2 className="font-semibold flex-grow" >
      				My Documents
      			</h2>
      			<p className="mr-12" >
      				Date Created
      			</p>
      			<FolderIcon className="text-3xl text-gray-700"/>
      		</div>
      	

      	{snapshot?.docs?.map((doc)=>(
      			<DocumentRow
      			key={doc.id}
      			id={doc.id}
      			fileName={doc.data().fileName}
      			date={doc.data().timestamp}
      			/>
      		))}

      	</div>
      </section>

    </div>
  )
}

export default NextPage;




export async function getServerSideProps(context){
	const session = await getSession(context);


	return{
		props:{
			session,
		}
	}
}