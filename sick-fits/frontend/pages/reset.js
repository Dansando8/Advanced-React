import { useRouter } from 'next/router';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset'

export default function ResetPage() {
  const params = useRouter();
  const { token } = params.query;

  if (!token) {
    return (
      <div>
        <p>Sorry, you most supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <Reset token={token}/>
    </div>
  );
}
