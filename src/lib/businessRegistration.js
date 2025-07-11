import { supabase } from './supabase';
import bcrypt from 'bcryptjs';

/**
 * Register a new business with owner authentication
 * @param {Object} businessData - Business registration data
 * @returns {Object} - Result object with success/error status
 */
export async function registerBusiness(businessData) {
  try {
    // Validate required fields
    const requiredFields = [
      'businessName', 'businessType', 'description', 'address', 
      'city', 'state', 'zipCode', 'phone', 'email', 'ownerName', 
      'ownerEmail', 'password'
    ];
    
    for (const field of requiredFields) {
      if (!businessData[field]) {
        return {
          success: false,
          error: `Missing required field: ${field}`
        };
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(businessData.email) || !emailRegex.test(businessData.ownerEmail)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }

    // Check if business email already exists
    const { data: existingBusiness } = await supabase
      .from('businesses')
      .select('id')
      .eq('email', businessData.email)
      .single();

    if (existingBusiness) {
      return {
        success: false,
        error: 'Business with this email already exists'
      };
    }

    // Check if owner email already exists
    const { data: existingOwner } = await supabase
      .from('business_owners')
      .select('id')
      .eq('email', businessData.ownerEmail)
      .single();

    if (existingOwner) {
      return {
        success: false,
        error: 'Owner with this email already exists'
      };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(businessData.password, 12);

    // Insert business
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .insert([{
        business_name: businessData.businessName,
        business_type: businessData.businessType,
        description: businessData.description,
        address: businessData.address,
        city: businessData.city,
        state: businessData.state,
        zip_code: businessData.zipCode,
        phone: businessData.phone,
        email: businessData.email,
        website: businessData.website || null,
        owner_name: businessData.ownerName,
        owner_email: businessData.ownerEmail,
        status: 'pending'
      }])
      .select()
      .single();

    if (businessError) {
      return {
        success: false,
        error: businessError.message
      };
    }

    // Insert business owner
    const { data: owner, error: ownerError } = await supabase
      .from('business_owners')
      .insert([{
        business_id: business.id,
        email: businessData.ownerEmail,
        password_hash: passwordHash,
        name: businessData.ownerName
      }])
      .select()
      .single();

    if (ownerError) {
      // Rollback business creation if owner creation fails
      await supabase
        .from('businesses')
        .delete()
        .eq('id', business.id);
      
      return {
        success: false,
        error: ownerError.message
      };
    }

    return {
      success: true,
      data: {
        businessId: business.id,
        ownerId: owner.id,
        businessName: business.business_name,
        status: business.status
      }
    };

  } catch (error) {
    console.error('Business registration error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during registration'
    };
  }
}

/**
 * Authenticate business owner login
 * @param {string} email - Owner email
 * @param {string} password - Owner password
 * @returns {Object} - Result object with success/error status
 */
export async function authenticateBusinessOwner(email, password) {
  try {
    // Get business owner by email
    const { data: owner, error: ownerError } = await supabase
      .from('business_owners')
      .select('id, email, password_hash, name, business_id')
      .eq('email', email)
      .single();

    if (ownerError || !owner) {
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, owner.password_hash);
    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }

    // Get business information
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('id, business_name, business_type, status')
      .eq('id', owner.business_id)
      .single();

    if (businessError) {
      return {
        success: false,
        error: 'Unable to retrieve business information'
      };
    }

    return {
      success: true,
      data: {
        ownerId: owner.id,
        ownerName: owner.name,
        ownerEmail: owner.email,
        businessId: business.id,
        businessName: business.business_name,
        businessType: business.business_type,
        businessStatus: business.status
      }
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during authentication'
    };
  }
}

/**
 * Get business by ID
 * @param {string} businessId - Business ID
 * @returns {Object} - Result object with business data
 */
export async function getBusinessById(businessId) {
  try {
    const { data: business, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', businessId)
      .single();

    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    return {
      success: true,
      data: business
    };

  } catch (error) {
    console.error('Get business error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while retrieving business'
    };
  }
}