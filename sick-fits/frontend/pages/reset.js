import { useRouter } from 'next/router';
import RequestReset from '../components/RequestReset';

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
      <p>RESET YOUR PASSWORD {token}</p>
    </div>
  );
}
