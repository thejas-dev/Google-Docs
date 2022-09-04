import {useState} from 'react'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState} from 'draft-js';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import {db} from '../firebase'
import {useSession} from 'next-auth/react';
import { doc,collection, useDocument, setDoc, getDocs, addDoc, getDoc } from "firebase/firestore";
import { convertFromRaw, convertToRaw} from 'draft-js'
import {useEffect} from 'react'

const Editor = dynamic(()=> import('react-draft-wysiwyg').then
	((module) => module.Editor),
	{
		ssr: false,
	}
);

function TextEditor() {
	const{data: session} = useSession();
	//initializing router
	const router = useRouter();
  	const { id } = router.query;
	const [editorState,setEditorState] = useState(
			EditorState.createEmpty()
		)
	const colRef = collection(db,'userDocs',session?.user?.email,"docs")
	

	

	const onEditorStateChange =(editorState) =>{
		setEditorState(editorState)
		
		setDoc(doc(colRef,id),{
			editorState: convertToRaw(editorState.getCurrentContent()),

		},{
			merge: true,
		})
	}

	// console.log(snapshot?.data()?.editorState);
		

	useEffect(()=>{
		(async ()=>{
			const docRef = doc(db,'userDocs',session?.user?.email,"docs",id)

			const docSnap = await getDoc(docRef);

			if(docSnap.exists()){
				const data = docSnap.data();
				console.log(data)
				if(data?.editorState){
				setEditorState(
					EditorState.createWithContent(
						convertFromRaw(data.editorState))
					)
				}
			}else{
				console.log("not exisits")
			}
		})
		()
	},[])


	return(
		<div className="bg-[#F8F9FA] min-h-screen pb-16" >
			<Editor
			editorState={editorState}
			onEditorStateChange={onEditorStateChange}
			toolbarClassName="flex sticky top-0 z-50
			!justify-center mx-auto"
			editorClassName='mt-6 bg-white shadow-lg max-w-4xl 
			mb-12 border p-7 mx-auto'
			/>

		</div>


		)
}

export default TextEditor;