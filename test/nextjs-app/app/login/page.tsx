import { ReactWrapper } from "@lotexiu/react/components/implementations"
import { ReactServerComponent } from "@lotexiu/react/components/ReactComponent/ReactServerComponent"
import { ReactNode } from "react"
import { SignIn } from "./client/SignIn"
import { SignUp } from "./client/SignUp"


const LoginPage = ReactWrapper(
  class LoginPage extends ReactServerComponent {
    
    render(component: this): ReactNode {
      return (
        <div>
          <SignIn></SignIn>
          {/* <SignUp></SignUp> */}
        </div>
      )
    }
  }
)

export default LoginPage;