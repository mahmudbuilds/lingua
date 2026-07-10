import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, StyleSheet } from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSignUp } from '@clerk/expo';

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  email: string;
}

export default function VerificationModal({ visible, onClose, email }: VerificationModalProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();
  const { signUp, fetchStatus, errors } = useSignUp();

  useEffect(() => {
    if (visible) {
      setCode(['', '', '', '', '', '']);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [visible]);

  const handleChange = (text: string, index: number) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    
    if (numericText.length > 1) {
      // Handle paste
      const digits = numericText.slice(0, 6).split('');
      const newCode = [...code];
      digits.forEach((d, i) => {
        if (index + i < 6) newCode[index + i] = d;
      });
      setCode(newCode);
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      if (newCode.every(c => c !== '')) {
         onComplete(newCode.join(''));
      }
      return;
    }

    const newCode = [...code];
    newCode[index] = numericText;
    setCode(newCode);

    if (numericText && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    if (newCode.every(c => c !== '')) {
       onComplete(newCode.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
    }
  };

  const onComplete = async (codeString: string) => {
    if (!signUp) return;
    try {
      await signUp.verifications.verifyEmailCode({ code: codeString });
      
      if (signUp.status === 'complete') {
        await signUp.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            onClose();
            const url = decorateUrl('/');
            if (url.startsWith('http')) {
              window.location.href = url;
            } else {
              router.replace(url as Href);
            }
          },
        });
      } else {
        console.error('Sign-up attempt not complete:', signUp);
      }
    } catch (err: any) {
      console.error(err);
      alert('An unexpected error occurred during verification.');
    }
  };

  const handleResend = async () => {
    if (!signUp) return;
    try {
      await signUp.verifications.sendEmailCode();
      alert('Verification code resent successfully!');
    } catch (err: any) {
      console.error(err);
      alert('An error occurred while resending the code.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="justify-end"
      >
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} 
          activeOpacity={1} 
          onPress={onClose}
        >
          <View style={{ flex: 1 }} />
          <TouchableOpacity 
            activeOpacity={1} 
            className="bg-white rounded-t-3xl px-6 pt-6 pb-12"
          >
            <View className="flex-row justify-between items-center mb-6">
              <Text className="h3 text-text-primary">Verification Code</Text>
              <TouchableOpacity onPress={onClose} className="p-2 -mr-2 bg-gray-100 rounded-full">
                <Ionicons name="close" size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>
            
            <Text className="body-lg text-text-secondary mb-8">
              We've sent a 6-digit verification code to <Text className="font-semibold text-text-primary">{email || 'your email'}</Text>. Please enter it below.
            </Text>

            <View className="flex-row justify-between gap-2 mb-8">
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  style={[
                    styles.input,
                    digit ? styles.inputFilled : styles.inputEmpty
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>

            <TouchableOpacity className="items-center" onPress={handleResend}>
              <Text className="text-primary body-lg font-bold">Resend Code</Text>
            </TouchableOpacity>

          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 48,
    height: 56,
    padding: 0,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#0D132B',
  },
  inputFilled: {
    borderWidth: 2,
    borderColor: '#6C4EF5',
    backgroundColor: '#FFFFFF',
  },
  inputEmpty: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
