import DescriptionIcon from '@mui/icons-material/Description'
import { Button } from "@material-tailwind/react";
import {useRouter} from 'next/router';
import {db} from '../../firebase'
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc,collection, setDoc, getDocs, addDoc, getDoc, orderBy } from "firebase/firestore";
//import TextEditor from '../../components/TextEditor';
import {getSession, signOut, useSession} from 'next-auth/react';
import Login from '../../components/Login';
import PeopleIcon from '@mui/icons-material/People'
import TextEditor from '../../components/TextEditor'

function Doc() {
	const{data: session} = useSession();
	if(!session) return (<Login />)

		// ref path for useColletion
	const colRef = collection(db,'userDocs',session?.user?.email,"docs")

		//initializing router
	const router = useRouter()
  	const { id } = router.query
	
	
	const [snapshot,loading,error] = useDocument(doc(colRef,id),{
	    snapshotListenOptions: { includeMetadataChanges: true },
	    }
	);
	    
    if(!loading && !snapshot.data().fileName){
  		router.replace("/")
  	}
    
	
 
	return(
		<div>
			<header className="flex justify-between items-center p-3 pb-2">
			<div className="flex" >
			<span onClick={()=>router.push('/')} className="cursor-pointer">
				<DescriptionIcon className="text-6xl text-blue-500"/>
			</span>
			<div className="flex flex-col" >
				<div>
				<h2 className="flex-grow text-xl">
					{snapshot?.data()?.fileName}
					
					
				</h2>
				</div>
				<div className="flex items-center text-sm space-x-1
				-ml-1 h-8 text-gray-600" >
					<button className="option" >File</button>
					<button className="option">Edit</button>
					<button className="option">View</button>
					<button className="option">Insert</button>
					<button className="option">Format</button>
					<button className="option">Tools</button>
				</div>
			</div>
			</div>
			<div className="flex items-center" >
			<Button
			color="red"
			size="regular"
			className="hidden md:inline-flex justify-center items-center"
			ripple={true}
			>
				<PeopleIcon className="text-md"/>SHARE
			</Button>

			<img src={session?.user?.image} alt="..."
 			className="h-10 ml-5 w-10 cursor-pointer rounded-full"
			/>
			</div>

			</header>

			<TextEditor

			/>
		</div>

		)
}

export default Doc;



export async  function getServerSideProps(context) {

	const session = await getSession(context)


	return{
		props:{
			session,
		}
	}
}