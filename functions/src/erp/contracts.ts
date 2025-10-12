import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

try { admin.initializeApp(); } catch (e) {}

export const signContract = functions.https.onCall(async (data, context) => {
  const { companyId, contractText, contractor, contracted, signer } = data || {} as any;
  if (!companyId || !contractText || !contractor?.cnpj || !contracted?.cnpj || !signer?.name) {
    throw new functions.https.HttpsError('invalid-argument', 'Parâmetros obrigatórios ausentes.');
  }
  const db = admin.firestore();
  const docRef = await db.collection('contracts').add({
    companyId,
    contractText,
    contractor, // { name, cnpj }
    contracted, // { name, cnpj }
    signer,     // { name, doc, email }
    signedAt: admin.firestore.FieldValue.serverTimestamp(),
    userId: context.auth?.uid || null,
    userAgent: (context.rawRequest?.headers?.['user-agent']) || null,
    ip: (context.rawRequest?.headers?.['x-forwarded-for']) || null,
    status: 'signed'
  });
  return { success: true, id: docRef.id };
});