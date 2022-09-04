import { Button } from "@material-tailwind/react/components/Button";
import { IconButton } from "@material-tailwind/react";
import MenuIcon from '@mui/icons-material/Menu'
import DescriptionIcon from '@mui/icons-material/Description'
import SearchIcon from '@mui/icons-material/Search'
import AppsIcon from '@mui/icons-material/Apps'
import LogoutIcon from '@mui/icons-material/Logout'
import {useSession,signOut} from 'next-auth/react'

function Header() {
	
      const{data: session} = useSession();

	return(
		<header className="flex overflow-x-hidden items-center sticky top-0 z-50 px-2 py-2 shadow-md
		bg-white" > 
			    
      			<Button 
      			color="blue-gray"
      			ripple={true}
      			variant="text"
      			className="rounded-full justify-center items-center flex bg-transparent shadow-none 
                        hover:shadow-none items-center h-20 w-20 border-0 hidden md:inline-flex"
      			>
      			<MenuIcon className="text-blue-500 mx-auto hidden md:inline-flex" />
      			</Button>
      			<DescriptionIcon className="text-5xl text-blue-500 hidden md:inline-flex"/>
      			<h1 className="hidden md:inline-flex ml-2 text-gray-700
      			text-2xl">
      			Docs
      			</h1>


      			<div className="mx-5 md:mx-20 flex flex-grow items-center px-2
      			py-2 bg-gray-100 text-gray-600
      			rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
      				<SearchIcon className="text-3xl text-gray-600 "/>
      				<input className="flex-grow px-5 text-base bg-transparent outline-none"
      				type="text" placeholder="Search" />
      			</div>
      			<Button 
      			color="gray"
      			variant="text"
      			ripple={true}
      			className="rounded-lg hidden md:inline-flex md:ml-20 w-20 border-0">
      			<AppsIcon className="text-3xl hidden md:inline-flex text-gray-600" />
      			</Button>
      			
                        {session?.user?.image ? 
                        <img 
                        loading="lazy"
                        onClick={signOut}
                        className="cursor-pointer h-12 w-12 rounded-full ml-2 mr-3"
                        src={session?.user?.image}
                        alt="Logout"
                        />   :  <Logout
                        className="text-4xl text-blue-500 ml-2 mr-3"
                        />
                        }
      			
      </header>

		)
}

export default Header;