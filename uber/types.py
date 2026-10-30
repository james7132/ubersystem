from __future__ import annotations

from typing import NewType

# Payment Gateway Identifiers
PaymentIntentId = NewType("PaymentIntentId", str)
ChargeId = NewType("ChargeId", str)
RefundId = NewType("RefundId", str)
CustomerId = NewType("CustomerId", str)

# Core Domain Model Identifiers
AttendeeId = NewType("AttendeeId", str)
GroupId = NewType("GroupId", str)
ReceiptId = NewType("ReceiptId", str)
ReceiptItemId = NewType("ReceiptItemId", str)
ReceiptTransactionId = NewType("ReceiptTransactionId", str)
PromoCodeId = NewType("PromoCodeId", str)
AdminAccountId = NewType("AdminAccountId", str)
DepartmentId = NewType("DepartmentId", str)

__all__ = [
    "PaymentIntentId",
    "ChargeId",
    "RefundId",
    "CustomerId",
    "AttendeeId",
    "GroupId",
    "ReceiptId",
    "ReceiptItemId",
    "ReceiptTransactionId",
    "PromoCodeId",
    "AdminAccountId",
    "DepartmentId",
]
