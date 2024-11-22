import { useParams, useSearchParams } from 'react-router-dom';

export default function UserDetails() {
    const { id, pp } = useParams();

    const [searchParams] = useSearchParams();

    const searchParamsString = Array.from(searchParams.entries())
        .map(([key, value]) => `${key}=${value}`)
        .join(', ');

    return (
        <div>
            This is UserID: {id}, and pp is {pp}, and search = {searchParamsString}
        </div>
    );
}