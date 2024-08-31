import React from 'react';
import { useLoading } from './LoadingContext';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
    const { loading } = useLoading();

    return loading ? (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    ) : null;
};

export default LoadingSpinner;
