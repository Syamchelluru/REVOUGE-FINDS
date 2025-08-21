// src/pages/Profile.tsx
import React, { useState, useEffect } from "react";
import { Button, Form, Card, Spinner, Alert } from "react-bootstrap";
import { getProfile, updateProfile } from "../services/profileService";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  exp: number;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    profilePic: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Redirect if no token
        if (!token) {
          navigate("/login");
          return;
        }

        // Check if token expired
        const decoded: JwtPayload = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await getProfile(token);
        setProfile({
          name: data.name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          profilePic: data.profilePic || "",
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        alert("Please select an image smaller than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          profilePic: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const updated = await updateProfile(token, {
        name: profile.name,
        profilePic: profile.profilePic,
      });

      setProfile({
        ...profile,
        name: updated.user.name,
        profilePic: updated.user.profilePic,
      });

      alert("✅ Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Card className="profile-card p-3 shadow-sm">
        {error && <Alert variant="danger">{error}</Alert>}

        <div className="text-center">
          <img
            src={profile.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ddd",
            }}
          />
          {editing && (
            <input
              type="file"
              accept="image/*"
              className="form-control mt-2"
              onChange={handleImageUpload}
            />
          )}
        </div>

        <Form className="mt-4">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              readOnly={!editing}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={profile.email} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control value={profile.mobile} readOnly />
          </Form.Group>
        </Form>

        {editing ? (
          <Button
            className="btn-success mt-3 w-100"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        ) : (
          <Button
            className="btn-primary mt-3 w-100"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </Card>
    </div>
  );
};

export default Profile;
