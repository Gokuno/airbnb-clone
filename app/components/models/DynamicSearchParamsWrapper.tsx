"use client";

import { useSearchParams } from "next/navigation";
import qs from "query-string";

interface DynamicSearchParamsWrapperProps {
    onParamsLoaded: (query: Record<string, unknown>) => void;
}

const DynamicSearchParamsWrapper: React.FC<DynamicSearchParamsWrapperProps> = ({ onParamsLoaded }) => {
    const params = useSearchParams();

    let currentQuery = {};
    if (params) {
        currentQuery = qs.parse(params.toString());
    }

    onParamsLoaded(currentQuery);

    return null;
};

export default DynamicSearchParamsWrapper;