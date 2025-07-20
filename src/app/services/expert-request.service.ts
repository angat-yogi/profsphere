import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, doc, getDocs, query, where } from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class ExpertRequestService {
  constructor(private firestore: Firestore) {}

  // Create a new expert request
  requestExpertStatus(user: {
    userId: string;
    name: string;
    email: string;
    expertise?: string[];
  }) {
    const expertRequests = collection(this.firestore, 'expert_requests');
    return addDoc(expertRequests, {
      ...user,
      requestedAt: Timestamp.now(),
      status: 'pending'
    });
  }

  // Get requests for moderation or user view
  getRequestsByStatus(status: 'pending' | 'approved' | 'rejected') {
    const q = query(
      collection(this.firestore, 'expert_requests'),
      where('status', '==', status)
    );
    return getDocs(q);
  }

  // Update status (admin functionality)
  updateRequestStatus(docId: string, newStatus: 'approved' | 'rejected') {
    const ref = doc(this.firestore, 'expert_requests', docId);
    return updateDoc(ref, {
      status: newStatus
    });
  }
}