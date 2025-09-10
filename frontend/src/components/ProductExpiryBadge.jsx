import React from 'react';

const ProductExpiryBadge = ({ expiryDate, isExpired, daysUntilExpiry, className = "" }) => {
    if (!expiryDate) return null;

    const getBadgeStyle = () => {
        if (isExpired) {
            return "bg-red-100 text-red-800 border-red-200";
        } else if (daysUntilExpiry <= 7) {
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        } else if (daysUntilExpiry <= 30) {
            return "bg-orange-100 text-orange-800 border-orange-200";
        } else {
            return "bg-green-100 text-green-800 border-green-200";
        }
    };

    const getBadgeText = () => {
        if (isExpired) {
            return "Expired";
        } else if (daysUntilExpiry === 0) {
            return "Expires Today";
        } else if (daysUntilExpiry === 1) {
            return "Expires Tomorrow";
        } else if (daysUntilExpiry <= 7) {
            return `${daysUntilExpiry} days left`;
        } else if (daysUntilExpiry <= 30) {
            return `${daysUntilExpiry} days left`;
        } else {
            return "Fresh";
        }
    };

    const getIcon = () => {
        if (isExpired) {
            return "⚠️";
        } else if (daysUntilExpiry <= 7) {
            return "⏰";
        } else {
            return "✅";
        }
    };

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded-full ${getBadgeStyle()} ${className}`}>
            <span>{getIcon()}</span>
            <span>{getBadgeText()}</span>
        </span>
    );
};

export default ProductExpiryBadge;