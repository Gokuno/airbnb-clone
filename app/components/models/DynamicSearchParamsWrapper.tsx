"use client";

import { useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

interface DynamicSearchParamsWrapperProps {
    onParamsLoaded: (query: Record<string, unknown>) => void;
}

const DynamicSearchParamsWrapper: React.FC<DynamicSearchParamsWrapperProps> = ({ onParamsLoaded }) => {
    const params = useSearchParams();
    const [query, setQuery] = useState<Record<string, unknown>>({});

    useEffect(() => {
        if (params) {
            const parsedQuery = qs.parse(params.toString());
            setQuery(parsedQuery);
        }
    }, [params]);

    useEffect(() => {
        onParamsLoaded(query);
    }, [query, onParamsLoaded]);

    return null;
};

export default DynamicSearchParamsWrapper;