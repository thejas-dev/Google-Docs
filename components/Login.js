import { Button } from "@material-tailwind/react/components/Button";
import Image from 'next/image'
import { getProviders , signIn, useSession } from 'next-auth/react'


export default function Login({providers}) {
	// body...
	

	return(
		<div className="flex flex-col items-center justify-center min-h-screen py-2" >
			<Image 
			src="https://links.papareact.com/1ui"
			height="300"
			width="550"
			objectFit="contain"
			/>
			
	
					<Button
						className="w-48 mt-10"
						color="blue"
						ripple={true}
						onClick={()=>signIn()}
						>
						Login
					</Button>
				
		</div>


		)
}


export async function getServerSideProps(){
	const providers = await getProviders();
	return{
		props: {
			providers 

		}
	}

}