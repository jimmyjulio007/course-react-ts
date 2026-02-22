import { useState } from 'react';
import { Button } from '@/shared/ui/button';

export const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="card">
            <Button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </Button>
            <p>
                Edit <code>src/pages/home/ui/HomePage.tsx</code> and save to test HMR
            </p>
        </div>
    );
};
