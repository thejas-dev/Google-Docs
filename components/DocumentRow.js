import { Button } from "@material-tailwind/react";
import {useRouter} from 'next/router'
import ArticleIcon from '@mui/icons-material/Article'
import MoreVertIcon from '@mui/icons-material/MoreVert'

function DocumentRow({id,fileName,date}) {

	const router = useRouter();

	

	return(
		<div
		onClick={()=>router.push(`/doc/${id}`)}
		className="flex items-center p-4 rounded-lg hover:bg-gray-200
		text-gray-700 text-sm cursor-pointer" >
			<ArticleIcon className="text-3xl text-blue-500"/>
			<p className="flex-grow text-gray-900 pl-5 w-10 pr-10 truncate">{fileName}</p>
			<p className="pr-12 text-sm">{date?.toDate().toLocaleDateString()}</p>		
			<div className="flex pl items-center justify-center" >
			
      				<MoreVertIcon className="text-3xl" />
      		
      		</div>	
		</div>

		)
}

export default DocumentRow;


